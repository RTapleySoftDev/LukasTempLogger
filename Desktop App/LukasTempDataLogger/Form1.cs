using System;
using System.Management;
using System.Collections.Generic;
using System.Drawing;
using System.Threading.Tasks;
using System.Windows.Forms;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using System.IO;


namespace LukasTempDataLogger
{
    public partial class Form1 : Form
    {
        List<string> comports = new List<string>();
        int timeDuration;
        int timeElapsed = 0;
        int timeElapsedSec = 0;
        TimeSpan t;
        List<int> ser1x = new List<int> { 0 };
        List<double> ser1y = new List<double> { 0 };
        int timer3Interval = 1000;
        int timer1Interval = 600;
        private int hour = 0;
        private int minute = 1;
        String filepath = @"C:\Users\Public\Documents";
        string formattedTime = string.Empty;
        private string fullpath;
        string setpoint = "200";
        double lasttemp = 0.0;
        string[] cloudFiles;
        string JgraphData;
        HttpHelper httpHelper = new HttpHelper();
        List<LiveData> RecordedData = new List<LiveData>();

        public Form1()
        {
            InitializeComponent();
            getComPorts();
            label8.Text = filepath;
            comboBox2.SelectedIndex = 0;
            comboBox3.SelectedIndex = 0;
            comboBox4.SelectedIndex = 0;
            comboBox5.Enabled = false;

            RenderGraph();
            getFilesForCombo();
        }

        private void getComPorts()
        {

            ManagementObjectSearcher searcher = new ManagementObjectSearcher("root\\CIMV2", queryString: "SELECT * From Win32_SerialPort");
            foreach (ManagementObject queryObj in searcher.Get())
            {
                comboBox1.Items.Add(queryObj["Name"].ToString().ToLower());

                Console.WriteLine(queryObj["Description"].ToString());
                Console.WriteLine(queryObj["Name"].ToString());
                Console.WriteLine(queryObj["SystemName"].ToString());

                String cs = queryObj["Name"].ToString();
                String x = cs.Substring(cs.IndexOf('(') + 1);
                x = x.Remove(x.Length - 1);
                comports.Add(x);
                Console.WriteLine("x = " + x);
            }
        }

        private void RenderGraph()
        {
            chart1.Series.Clear();
            chart1.Series.Add("Series1");

            chart1.Series["Series1"].Points.DataBindXY(ser1x, ser1y);
            chart1.Series["Series1"].ChartType = System.Windows.Forms.DataVisualization.Charting.SeriesChartType.Line;
            chart1.Series["Series1"].BorderWidth = 2;
            chart1.Series["Series1"].Color = Color.Red;
            chart1.Series["Series1"].LegendText = "Temperature Probe";

            chart1.ChartAreas[0].AxisX.Minimum = 0;
            chart1.ChartAreas[0].AxisX.Title = "Seconds";
            chart1.ChartAreas[0].AxisY.Title = "Temperature °C";
        }

        private void timer1_Tick(object sender, EventArgs e)
        {
            this.progressBar1.Increment(1);

        }

        private void timer2_Tick(object sender, EventArgs e)
        {
            // Create a file to write to.
            using (StreamWriter sw = File.AppendText(fullpath))
            {
                sw.WriteLine(textBox1.Text + "," + timeElapsed);

            }
            RecordedData.Add(new LiveData() { ProbeTemp = textBox1.Text, Time = timeElapsed });
        }

        private void timer3_Tick(object sender, EventArgs e)
        {
            if ((timeDuration * 60) - timeElapsed > 0)
            {
                timeElapsed = timeElapsed + (timer3Interval / 1000);
                addNewValues(timeElapsed);
                Console.WriteLine("timer3Interval " + timer3Interval / 1000);
                Console.WriteLine("Time Elapsed " + timeElapsed);
            }
            else
            {
                this.buttonStop.PerformClick();
                Console.WriteLine("buttonStop.PerformClick()@ " + timeElapsed);
            }

        }

        private void timer4_Tick(object sender, EventArgs e)
        {
            if (comports.Count > 0 && serialPort1.IsOpen == false)
            {
                serialPort1.Open();
            }

            Console.WriteLine("In getSerialJson Port open " + serialPort1.IsOpen);

            if (serialPort1.IsOpen)
            {
                serialPort1.DiscardInBuffer();
                byte[] buf = System.Text.Encoding.UTF8.GetBytes(setpoint + "\n");
                serialPort1.Write(buf, 0, buf.Length);

                String ser = serialPort1.ReadLine();
                try
                {
                    dynamic x = JObject.Parse(ser);
                    if (x.probeOne != null)
                    {
                        double newy1 = x.probeOne;
                        lasttemp = newy1;
                    }
                }

                catch (JsonReaderException) 
                {
                    // Next Serial Port Reading is counted
                }
            }

            else
            {
                MessageBox.Show("Error Reading Arduino data from Com Port");
                buttonStop.PerformClick();
            }

        }

        private double getSerialJson()
        {
            return lasttemp;
        }

        private String getFolderPath()
        {
            using (var fbd = new FolderBrowserDialog())
            {
                DialogResult result = fbd.ShowDialog();

                if (result == DialogResult.OK && !string.IsNullOrWhiteSpace(fbd.SelectedPath))
                {
                    return fbd.SelectedPath;

                }
            }
            return "";
        }

        private void buttonStart_Click(object sender, EventArgs e)
        {
            ser1x.Clear();
            ser1y.Clear();
            ser1x.Add(0);
            ser1y.Add(0);

            if (comboBox1.Text.Length == 0) { MessageBox.Show("Com Port not set"); }
            else
            {
                var time = DateTime.Now;
                formattedTime = time.ToString("yyyyMMdd-HHmmss");
                Console.WriteLine(formattedTime);
                fullpath = @filepath + @"\" + formattedTime + @".csv";
                if (!File.Exists(fullpath))
                {
                    // Create a file to write to.
                    try
                    {
                        using (StreamWriter sw = File.CreateText(fullpath))
                        {
                            sw.WriteLine("ProbeTemp,Time");

                        }
                    }
                    catch (System.UnauthorizedAccessException uae)
                    {
                        MessageBox.Show("Unauthorized Access to Folder \n Please Change Folder." + uae);
                        return;
                    }
                }

                progressBarTimer.Interval = timer1Interval;
                updateChartTimer.Interval = timer3Interval;
                this.secondCountdownTimer.Start();
                this.timer4.Start();
                this.updateChartTimer.Start();
                this.progressBarTimer.Start();
                this.fileWriteTimer.Start();
                this.progressBar1.Value = 0;
                comboBox1.Enabled = false;
                comboBox2.Enabled = false;
                comboBox3.Enabled = false;
                comboBox4.Enabled = false;
                comboBox5.Enabled = false;

            }
        }

        private void buttonStop_Click(object sender, EventArgs e)
        {
            comboBox1.Enabled = true;
            comboBox2.Enabled = true;
            comboBox3.Enabled = true;
            comboBox4.Enabled = true;
            comboBox5.Enabled = true;
            this.label3.Text = "00:00";
            timeElapsed = 0;
            this.secondCountdownTimer.Stop();
            this.secondCountdownTimer.Dispose();
            this.timer4.Stop();
            this.timer4.Dispose();
            this.updateChartTimer.Stop();
            this.updateChartTimer.Dispose();
            this.progressBarTimer.Stop();
            this.progressBarTimer.Dispose();
            this.fileWriteTimer.Stop();
            this.fileWriteTimer.Dispose();
            ser1x.Clear();
            ser1y.Clear();
            ser1x.Add(0);
            ser1y.Add(0);
            progressBar1.Value = progressBar1.Maximum;
            saveFileToCloud(formattedTime + @".csv");

        }

        private void addNewValues(int timeElap)
        {
            ser1x.Add(timeElap);
            double newy1 = getSerialJson();// called at line 94
            try
            {
                Console.WriteLine("newy1 = " + newy1);
                ser1y.Add(newy1);
                chart1.Series["Series1"].Points.DataBindXY(ser1x, ser1y);
                textBox1.Text = newy1.ToString();
            }
            catch (Exception je)
            {
                MessageBox.Show("" + je);
            }

            chart1.Update();
        }

        private void comboBox1_SelectedIndexChanged(object sender, EventArgs e)
        {
            String cs = comboBox1.Text;
            String x = cs.Substring(cs.IndexOf('(') + 1);
            x = x.Remove(x.Length - 1);
            serialPort1.PortName = x;
            Console.WriteLine(serialPort1.PortName);
        }

        private void comboBox4_SelectedIndexChanged(object sender, EventArgs e)
        {
            timer3Interval = Int32.Parse(comboBox4.Text) * 1000;
            updateChartTimer.Interval = timer3Interval;
            fileWriteTimer.Interval = timer3Interval;
        }

        private void comboBox2_SelectedIndexChanged(object sender, EventArgs e)
        {
            if (comboBox3.Text.Length > 0)
            {
                Console.WriteLine("comboBox3.Text = " + comboBox3.Text + " length = " + comboBox3.Text.Length);
                hour = Int32.Parse(comboBox2.Text);
                minute = Int32.Parse(comboBox3.Text);
                timeDuration = (hour * 60) + minute;
                Console.WriteLine("timeDuration = " + timeDuration);

                float h = (float)hour;
                float m = (float)minute;
                timer1Interval = (int)(timeDuration * 60) * 10;
                Console.WriteLine("timer1Interval = " + timer1Interval);
                progressBarTimer.Interval = timer1Interval;
            }
        }

        private void comboBox3_SelectedIndexChanged(object sender, EventArgs e)
        {
            if (comboBox2.Text.Length > 0)
            {
                hour = Int32.Parse(comboBox2.Text);
                minute = Int32.Parse(comboBox3.Text);
                timeDuration = (hour * 60) + minute;
                Console.WriteLine("timeDuration = " + timeDuration);

                float h = (float)hour;
                float m = (float)minute;
                timer1Interval = (int)(timeDuration * 60) * 10;
                Console.WriteLine("timer1Interval = " + timer1Interval);
                progressBarTimer.Interval = timer1Interval;
            }
        }

        private void buttonPath_Click(object sender, EventArgs e)
        {
            filepath = getFolderPath();
            label8.Text = filepath;
        }

        private void numericUpDown1_ValueChanged(object sender, EventArgs e)
        {
            setpoint = NumericUpDown1.Value.ToString();

        }

        private void printToTextBox()
        {
            textBox1.Text = setpoint;
        }

        private void secondCountdownTimer_Tick(object sender, EventArgs e)
        {
            timeElapsedSec = timeElapsedSec + 1;
            t = TimeSpan.FromSeconds((timeDuration * 60) - timeElapsedSec);
            this.label3.Text = t.ToString(@"dd\:hh\:mm\:ss");
        }
        private async void getFilesForCombo()
        {
            Cursor = Cursors.WaitCursor;
            Task t = httpHelper.SetMyFiles();
            await t;
            cloudFiles = httpHelper.GetMyFiles();
            for (int i = 0; i < cloudFiles.Length; i++)
            {
                cloudFiles[i] = cloudFiles[i].Trim('"');
            }
            BindingSource theBindingSource = new BindingSource();
            theBindingSource.DataSource = cloudFiles;
            comboBox5.DataSource = theBindingSource.DataSource;
            comboBox5.Enabled = true;
            Cursor = Cursors.Arrow; 
        }

        private async void getDataForGraph(string fileNameIn)
        {
            Console.WriteLine("FileName = " + fileNameIn);
            Cursor = Cursors.WaitCursor;
            Task t = httpHelper.SetMyInData(fileNameIn);
            await t;
            JgraphData = httpHelper.GetMyInData();
            dynamic y = Newtonsoft.Json.JsonConvert.DeserializeObject(JgraphData);
            ser1x.Clear();
            ser1y.Clear();
            ser1x.Add(0);
            ser1y.Add(0);
            Cursor = Cursors.Arrow; 

            chart1.Series["Series1"].Points.DataBindXY(ser1x, ser1y);
            foreach (var line in y)
            {
                ser1y.Add(Convert.ToDouble(line.ProbeTemp));
                ser1x.Add(Convert.ToInt32(line.Time));
                chart1.Series["Series1"].Points.DataBindXY(ser1x, ser1y);
            }
            chart1.Update();
        }

        private async void saveFileToCloud(string fileNameIn)
        {
            Cursor = Cursors.WaitCursor;
            var dataIn = JsonConvert.SerializeObject(RecordedData);
            Task t = httpHelper.SetMyOutData(fileNameIn, dataIn);
            await t;
            RecordedData.Clear();
            Cursor = Cursors.Arrow;
        }

        private void tableLayoutPanel1_Paint(object sender, PaintEventArgs e)
        {

        }

        private void comboBox5_SelectedIndexChanged(object sender, EventArgs e)
        {
            Console.WriteLine("xxxxxx "+comboBox5.Text.ToString());
            getDataForGraph(comboBox5.Text.ToString());
        }

        private void comboBox5_SelectedIndexChanged_1(object sender, EventArgs e)
        {
            Console.WriteLine("xxxxxx " + comboBox5.Text.ToString());
            getDataForGraph(comboBox5.Text.ToString());
        }

        /// <summary>
        ///Simple Class to store live data in List<Object>
        /// <summary>
        public class LiveData
        {
            public string ProbeTemp { get; set; }
            public int Time { get; set; }  
        }
    }
}

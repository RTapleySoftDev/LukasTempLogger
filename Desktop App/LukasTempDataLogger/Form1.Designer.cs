namespace LukasTempDataLogger
{
    partial class Form1
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.components = new System.ComponentModel.Container();
            System.Windows.Forms.DataVisualization.Charting.ChartArea chartArea2 = new System.Windows.Forms.DataVisualization.Charting.ChartArea();
            System.Windows.Forms.DataVisualization.Charting.Legend legend2 = new System.Windows.Forms.DataVisualization.Charting.Legend();
            System.Windows.Forms.DataVisualization.Charting.Series series2 = new System.Windows.Forms.DataVisualization.Charting.Series();
            System.Windows.Forms.DataVisualization.Charting.Title title2 = new System.Windows.Forms.DataVisualization.Charting.Title();
            this.serialPort1 = new System.IO.Ports.SerialPort(this.components);
            this.tableLayoutPanel1 = new System.Windows.Forms.TableLayoutPanel();
            this.panel2 = new System.Windows.Forms.Panel();
            this.label11 = new System.Windows.Forms.Label();
            this.label10 = new System.Windows.Forms.Label();
            this.comboBox5 = new System.Windows.Forms.ComboBox();
            this.panel1 = new System.Windows.Forms.Panel();
            this.buttonPath = new System.Windows.Forms.Button();
            this.label8 = new System.Windows.Forms.Label();
            this.label7 = new System.Windows.Forms.Label();
            this.label2 = new System.Windows.Forms.Label();
            this.textBox1 = new System.Windows.Forms.TextBox();
            this.groupBox1 = new System.Windows.Forms.GroupBox();
            this.NumericUpDown1 = new System.Windows.Forms.NumericUpDown();
            this.label9 = new System.Windows.Forms.Label();
            this.comboBox4 = new System.Windows.Forms.ComboBox();
            this.label6 = new System.Windows.Forms.Label();
            this.comboBox3 = new System.Windows.Forms.ComboBox();
            this.comboBox2 = new System.Windows.Forms.ComboBox();
            this.label5 = new System.Windows.Forms.Label();
            this.label4 = new System.Windows.Forms.Label();
            this.progressBar1 = new System.Windows.Forms.ProgressBar();
            this.label3 = new System.Windows.Forms.Label();
            this.buttonStop = new System.Windows.Forms.Button();
            this.buttonStart = new System.Windows.Forms.Button();
            this.label1 = new System.Windows.Forms.Label();
            this.comboBox1 = new System.Windows.Forms.ComboBox();
            this.chart1 = new System.Windows.Forms.DataVisualization.Charting.Chart();
            this.updateChartTimer = new System.Windows.Forms.Timer(this.components);
            this.progressBarTimer = new System.Windows.Forms.Timer(this.components);
            this.fileWriteTimer = new System.Windows.Forms.Timer(this.components);
            this.timer4 = new System.Windows.Forms.Timer(this.components);
            this.secondCountdownTimer = new System.Windows.Forms.Timer(this.components);
            this.tableLayoutPanel1.SuspendLayout();
            this.panel2.SuspendLayout();
            this.panel1.SuspendLayout();
            this.groupBox1.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.NumericUpDown1)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.chart1)).BeginInit();
            this.SuspendLayout();
            // 
            // serialPort1
            // 
            this.serialPort1.DtrEnable = true;
            this.serialPort1.PortName = "COM6";
            this.serialPort1.RtsEnable = true;
            // 
            // tableLayoutPanel1
            // 
            this.tableLayoutPanel1.BackColor = System.Drawing.SystemColors.InactiveCaption;
            this.tableLayoutPanel1.ColumnCount = 2;
            this.tableLayoutPanel1.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 50F));
            this.tableLayoutPanel1.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 50F));
            this.tableLayoutPanel1.Controls.Add(this.panel2, 1, 0);
            this.tableLayoutPanel1.Controls.Add(this.panel1, 0, 0);
            this.tableLayoutPanel1.Controls.Add(this.chart1, 0, 1);
            this.tableLayoutPanel1.GrowStyle = System.Windows.Forms.TableLayoutPanelGrowStyle.AddColumns;
            this.tableLayoutPanel1.Location = new System.Drawing.Point(34, 41);
            this.tableLayoutPanel1.Name = "tableLayoutPanel1";
            this.tableLayoutPanel1.RowCount = 2;
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 50F));
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 50F));
            this.tableLayoutPanel1.Size = new System.Drawing.Size(1073, 645);
            this.tableLayoutPanel1.TabIndex = 2;
            this.tableLayoutPanel1.Paint += new System.Windows.Forms.PaintEventHandler(this.tableLayoutPanel1_Paint);
            // 
            // panel2
            // 
            this.panel2.BackColor = System.Drawing.SystemColors.ActiveBorder;
            this.panel2.Controls.Add(this.label11);
            this.panel2.Controls.Add(this.label10);
            this.panel2.Controls.Add(this.comboBox5);
            this.panel2.Location = new System.Drawing.Point(539, 3);
            this.panel2.Name = "panel2";
            this.panel2.Size = new System.Drawing.Size(269, 183);
            this.panel2.TabIndex = 2;
            // 
            // label11
            // 
            this.label11.AutoSize = true;
            this.label11.Font = new System.Drawing.Font("Microsoft Sans Serif", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label11.Location = new System.Drawing.Point(74, 25);
            this.label11.Name = "label11";
            this.label11.Size = new System.Drawing.Size(154, 17);
            this.label11.TabIndex = 4;
            this.label11.Text = "View Cloud Saved Files";
            // 
            // label10
            // 
            this.label10.AutoSize = true;
            this.label10.Location = new System.Drawing.Point(37, 55);
            this.label10.Name = "label10";
            this.label10.Size = new System.Drawing.Size(23, 13);
            this.label10.TabIndex = 3;
            this.label10.Text = "File";
            // 
            // comboBox5
            // 
            this.comboBox5.FormattingEnabled = true;
            this.comboBox5.Location = new System.Drawing.Point(66, 52);
            this.comboBox5.Name = "comboBox5";
            this.comboBox5.Size = new System.Drawing.Size(176, 21);
            this.comboBox5.TabIndex = 2;
            this.comboBox5.SelectedIndexChanged += new System.EventHandler(this.comboBox5_SelectedIndexChanged_1);
            // 
            // panel1
            // 
            this.panel1.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom)));
            this.panel1.BackColor = System.Drawing.SystemColors.ActiveBorder;
            this.panel1.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.panel1.Controls.Add(this.buttonPath);
            this.panel1.Controls.Add(this.label8);
            this.panel1.Controls.Add(this.label7);
            this.panel1.Controls.Add(this.label2);
            this.panel1.Controls.Add(this.textBox1);
            this.panel1.Controls.Add(this.groupBox1);
            this.panel1.Controls.Add(this.progressBar1);
            this.panel1.Controls.Add(this.label3);
            this.panel1.Controls.Add(this.buttonStop);
            this.panel1.Controls.Add(this.buttonStart);
            this.panel1.Controls.Add(this.label1);
            this.panel1.Controls.Add(this.comboBox1);
            this.panel1.Location = new System.Drawing.Point(43, 3);
            this.panel1.MaximumSize = new System.Drawing.Size(450, 250);
            this.panel1.MinimumSize = new System.Drawing.Size(450, 300);
            this.panel1.Name = "panel1";
            this.panel1.Size = new System.Drawing.Size(450, 300);
            this.panel1.TabIndex = 0;
            // 
            // buttonPath
            // 
            this.buttonPath.Location = new System.Drawing.Point(351, 272);
            this.buttonPath.Name = "buttonPath";
            this.buttonPath.Size = new System.Drawing.Size(75, 23);
            this.buttonPath.TabIndex = 9;
            this.buttonPath.Text = "Change";
            this.buttonPath.UseVisualStyleBackColor = true;
            this.buttonPath.Click += new System.EventHandler(this.buttonPath_Click);
            // 
            // label8
            // 
            this.label8.AutoSize = true;
            this.label8.BackColor = System.Drawing.SystemColors.ButtonHighlight;
            this.label8.Location = new System.Drawing.Point(104, 277);
            this.label8.MaximumSize = new System.Drawing.Size(240, 0);
            this.label8.MinimumSize = new System.Drawing.Size(240, 0);
            this.label8.Name = "label8";
            this.label8.Size = new System.Drawing.Size(240, 13);
            this.label8.TabIndex = 8;
            this.label8.Text = "C:\\";
            // 
            // label7
            // 
            this.label7.AutoSize = true;
            this.label7.Location = new System.Drawing.Point(20, 277);
            this.label7.Name = "label7";
            this.label7.Size = new System.Drawing.Size(77, 13);
            this.label7.TabIndex = 7;
            this.label7.Text = "FIle Save Path";
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(348, 218);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(48, 13);
            this.label2.TabIndex = 0;
            this.label2.Text = "Temp °C";
            // 
            // textBox1
            // 
            this.textBox1.ForeColor = System.Drawing.Color.Red;
            this.textBox1.Location = new System.Drawing.Point(326, 234);
            this.textBox1.Name = "textBox1";
            this.textBox1.Size = new System.Drawing.Size(100, 20);
            this.textBox1.TabIndex = 1;
            // 
            // groupBox1
            // 
            this.groupBox1.Controls.Add(this.NumericUpDown1);
            this.groupBox1.Controls.Add(this.label9);
            this.groupBox1.Controls.Add(this.comboBox4);
            this.groupBox1.Controls.Add(this.label6);
            this.groupBox1.Controls.Add(this.comboBox3);
            this.groupBox1.Controls.Add(this.comboBox2);
            this.groupBox1.Controls.Add(this.label5);
            this.groupBox1.Controls.Add(this.label4);
            this.groupBox1.Location = new System.Drawing.Point(24, 51);
            this.groupBox1.Name = "groupBox1";
            this.groupBox1.Size = new System.Drawing.Size(402, 131);
            this.groupBox1.TabIndex = 6;
            this.groupBox1.TabStop = false;
            this.groupBox1.Text = "Duration";
            // 
            // NumericUpDown1
            // 
            this.NumericUpDown1.Increment = new decimal(new int[] {
            10,
            0,
            0,
            0});
            this.NumericUpDown1.Location = new System.Drawing.Point(76, 91);
            this.NumericUpDown1.Maximum = new decimal(new int[] {
            1000,
            0,
            0,
            0});
            this.NumericUpDown1.Name = "NumericUpDown1";
            this.NumericUpDown1.Size = new System.Drawing.Size(88, 20);
            this.NumericUpDown1.TabIndex = 9;
            this.NumericUpDown1.Value = new decimal(new int[] {
            200,
            0,
            0,
            0});
            this.NumericUpDown1.ValueChanged += new System.EventHandler(this.numericUpDown1_ValueChanged);
            // 
            // label9
            // 
            this.label9.AutoSize = true;
            this.label9.Location = new System.Drawing.Point(11, 93);
            this.label9.Name = "label9";
            this.label9.Size = new System.Drawing.Size(50, 13);
            this.label9.TabIndex = 6;
            this.label9.Text = "Set Point";
            // 
            // comboBox4
            // 
            this.comboBox4.FormattingEnabled = true;
            this.comboBox4.Items.AddRange(new object[] {
            "1",
            "2",
            "3",
            "4",
            "5",
            "10",
            "15",
            "20",
            "30",
            "60",
            "120",
            "300",
            "600",
            "1200",
            "1800",
            "",
            ""});
            this.comboBox4.Location = new System.Drawing.Point(302, 50);
            this.comboBox4.Name = "comboBox4";
            this.comboBox4.Size = new System.Drawing.Size(88, 21);
            this.comboBox4.TabIndex = 5;
            this.comboBox4.SelectedIndexChanged += new System.EventHandler(this.comboBox4_SelectedIndexChanged);
            // 
            // label6
            // 
            this.label6.AutoSize = true;
            this.label6.Location = new System.Drawing.Point(280, 23);
            this.label6.Name = "label6";
            this.label6.Size = new System.Drawing.Size(110, 13);
            this.label6.TabIndex = 4;
            this.label6.Text = "Data Resolution Secs";
            // 
            // comboBox3
            // 
            this.comboBox3.FormattingEnabled = true;
            this.comboBox3.Items.AddRange(new object[] {
            "1",
            "2",
            "3",
            "4",
            "5",
            "10",
            "15",
            "20",
            "30",
            "45",
            "59"});
            this.comboBox3.Location = new System.Drawing.Point(76, 50);
            this.comboBox3.Name = "comboBox3";
            this.comboBox3.Size = new System.Drawing.Size(88, 21);
            this.comboBox3.TabIndex = 3;
            this.comboBox3.SelectedIndexChanged += new System.EventHandler(this.comboBox3_SelectedIndexChanged);
            // 
            // comboBox2
            // 
            this.comboBox2.FormattingEnabled = true;
            this.comboBox2.Items.AddRange(new object[] {
            "0",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "12",
            "24",
            "36",
            "48",
            "96",
            "192",
            "384",
            "1000"});
            this.comboBox2.Location = new System.Drawing.Point(76, 23);
            this.comboBox2.Name = "comboBox2";
            this.comboBox2.Size = new System.Drawing.Size(88, 21);
            this.comboBox2.TabIndex = 2;
            this.comboBox2.SelectedIndexChanged += new System.EventHandler(this.comboBox2_SelectedIndexChanged);
            // 
            // label5
            // 
            this.label5.AutoSize = true;
            this.label5.Location = new System.Drawing.Point(11, 54);
            this.label5.Name = "label5";
            this.label5.Size = new System.Drawing.Size(44, 13);
            this.label5.TabIndex = 1;
            this.label5.Text = "Minutes";
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.Location = new System.Drawing.Point(20, 26);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(35, 13);
            this.label4.TabIndex = 0;
            this.label4.Text = "Hours";
            // 
            // progressBar1
            // 
            this.progressBar1.ForeColor = System.Drawing.Color.Lime;
            this.progressBar1.Location = new System.Drawing.Point(24, 203);
            this.progressBar1.Name = "progressBar1";
            this.progressBar1.Size = new System.Drawing.Size(228, 23);
            this.progressBar1.Step = 1;
            this.progressBar1.Style = System.Windows.Forms.ProgressBarStyle.Continuous;
            this.progressBar1.TabIndex = 5;
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Location = new System.Drawing.Point(107, 240);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(64, 13);
            this.label3.TabIndex = 4;
            this.label3.Text = "00:00:00:00";
            // 
            // buttonStop
            // 
            this.buttonStop.Location = new System.Drawing.Point(177, 234);
            this.buttonStop.Name = "buttonStop";
            this.buttonStop.Size = new System.Drawing.Size(75, 23);
            this.buttonStop.TabIndex = 3;
            this.buttonStop.Text = "Stop";
            this.buttonStop.UseVisualStyleBackColor = true;
            this.buttonStop.Click += new System.EventHandler(this.buttonStop_Click);
            // 
            // buttonStart
            // 
            this.buttonStart.Location = new System.Drawing.Point(24, 235);
            this.buttonStart.Name = "buttonStart";
            this.buttonStart.Size = new System.Drawing.Size(75, 23);
            this.buttonStart.TabIndex = 2;
            this.buttonStart.Text = "Start";
            this.buttonStart.UseVisualStyleBackColor = true;
            this.buttonStart.Click += new System.EventHandler(this.buttonStart_Click);
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(20, 28);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(50, 13);
            this.label1.TabIndex = 1;
            this.label1.Text = "Com Port";
            // 
            // comboBox1
            // 
            this.comboBox1.FormattingEnabled = true;
            this.comboBox1.Location = new System.Drawing.Point(76, 25);
            this.comboBox1.Name = "comboBox1";
            this.comboBox1.Size = new System.Drawing.Size(176, 21);
            this.comboBox1.TabIndex = 0;
            this.comboBox1.SelectedIndexChanged += new System.EventHandler(this.comboBox1_SelectedIndexChanged);
            // 
            // chart1
            // 
            this.chart1.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom)));
            this.chart1.BackColor = System.Drawing.Color.WhiteSmoke;
            this.chart1.BackSecondaryColor = System.Drawing.Color.White;
            this.chart1.BorderlineDashStyle = System.Windows.Forms.DataVisualization.Charting.ChartDashStyle.Solid;
            chartArea2.BackGradientStyle = System.Windows.Forms.DataVisualization.Charting.GradientStyle.TopBottom;
            chartArea2.BackSecondaryColor = System.Drawing.Color.LightCyan;
            chartArea2.Name = "ChartArea1";
            this.chart1.ChartAreas.Add(chartArea2);
            this.tableLayoutPanel1.SetColumnSpan(this.chart1, 2);
            legend2.Name = "Legend1";
            this.chart1.Legends.Add(legend2);
            this.chart1.Location = new System.Drawing.Point(8, 325);
            this.chart1.Name = "chart1";
            this.chart1.Palette = System.Windows.Forms.DataVisualization.Charting.ChartColorPalette.Grayscale;
            series2.ChartArea = "ChartArea1";
            series2.ChartType = System.Windows.Forms.DataVisualization.Charting.SeriesChartType.Line;
            series2.Color = System.Drawing.Color.Red;
            series2.Legend = "Legend1";
            series2.Name = "Ktype Temp";
            this.chart1.Series.Add(series2);
            this.chart1.Size = new System.Drawing.Size(1056, 317);
            this.chart1.TabIndex = 1;
            this.chart1.Text = "chart1";
            title2.BackColor = System.Drawing.Color.White;
            title2.Font = new System.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            title2.ForeColor = System.Drawing.Color.SteelBlue;
            title2.Name = "Title1";
            title2.Text = "Temperature";
            this.chart1.Titles.Add(title2);
            // 
            // updateChartTimer
            // 
            this.updateChartTimer.Interval = 1000;
            this.updateChartTimer.Tick += new System.EventHandler(this.timer3_Tick);
            // 
            // progressBarTimer
            // 
            this.progressBarTimer.Interval = 1000;
            this.progressBarTimer.Tick += new System.EventHandler(this.timer1_Tick);
            // 
            // fileWriteTimer
            // 
            this.fileWriteTimer.Interval = 1000;
            this.fileWriteTimer.Tick += new System.EventHandler(this.timer2_Tick);
            // 
            // timer4
            // 
            this.timer4.Interval = 1000;
            this.timer4.Tick += new System.EventHandler(this.timer4_Tick);
            // 
            // secondCountdownTimer
            // 
            this.secondCountdownTimer.Interval = 1000;
            this.secondCountdownTimer.Tick += new System.EventHandler(this.secondCountdownTimer_Tick);
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.SystemColors.ScrollBar;
            this.ClientSize = new System.Drawing.Size(1119, 698);
            this.Controls.Add(this.tableLayoutPanel1);
            this.Name = "Form1";
            this.Text = "Lukas DataLogger";
            this.tableLayoutPanel1.ResumeLayout(false);
            this.panel2.ResumeLayout(false);
            this.panel2.PerformLayout();
            this.panel1.ResumeLayout(false);
            this.panel1.PerformLayout();
            this.groupBox1.ResumeLayout(false);
            this.groupBox1.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)(this.NumericUpDown1)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.chart1)).EndInit();
            this.ResumeLayout(false);

        }

        #endregion
        private System.IO.Ports.SerialPort serialPort1;
        private System.Windows.Forms.TableLayoutPanel tableLayoutPanel1;
        protected internal System.Windows.Forms.Panel panel1;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.TextBox textBox1;
        private System.Windows.Forms.GroupBox groupBox1;
        private System.Windows.Forms.ComboBox comboBox4;
        private System.Windows.Forms.Label label6;
        private System.Windows.Forms.ComboBox comboBox3;
        private System.Windows.Forms.ComboBox comboBox2;
        private System.Windows.Forms.Label label5;
        private System.Windows.Forms.Label label4;
        private System.Windows.Forms.ProgressBar progressBar1;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.Button buttonStop;
        private System.Windows.Forms.Button buttonStart;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.ComboBox comboBox1;
        private System.Windows.Forms.DataVisualization.Charting.Chart chart1;
        private System.Windows.Forms.Timer updateChartTimer;
        private System.Windows.Forms.Timer progressBarTimer;
        private System.Windows.Forms.Timer fileWriteTimer;
        private System.Windows.Forms.Button buttonPath;
        private System.Windows.Forms.Label label8;
        private System.Windows.Forms.Label label7;
        private System.Windows.Forms.NumericUpDown NumericUpDown1;
        private System.Windows.Forms.Label label9;
        private System.Windows.Forms.Timer timer4;
        private System.Windows.Forms.Timer secondCountdownTimer;
        private System.Windows.Forms.Panel panel2;
        private System.Windows.Forms.Label label11;
        private System.Windows.Forms.Label label10;
        private System.Windows.Forms.ComboBox comboBox5;
    }
}


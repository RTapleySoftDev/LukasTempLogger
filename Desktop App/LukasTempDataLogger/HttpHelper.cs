using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace LukasTempDataLogger
{
    /// <summary>
    /// Class that deals with Http Requests specific to this application
    /// </summary>
    public class HttpHelper
    {
        private string[] myfiles;
        private string myindata;
        private string myoutdata;
        private Dictionary<string,string> values = new Dictionary<string, string>
        {
           { "user", "Guest" },
           { "pass", "guest123" },
           {"file", "201902190164616" },
            {"data", @"[{ProbeTemp:'0',Temp:'0'}]" }
        };

        private string fileurl = @"https://richsoftdev.pythonanywhere.com/restgetfilelist";
        private string indataurl = @"https://richsoftdev.pythonanywhere.com/restgetfile";
        private string outdataurl = @"https://richsoftdev.pythonanywhere.com/restsavefile";

        public string[] GetMyFiles()
        {
            return myfiles;
        }
        /// <summary>
        /// Post to server: To get file names stored on Cloud Server.
        /// Sets Class string[] myfiles Attribute
        /// </summary>
        /// <returns></returns>
        public async Task SetMyFiles()
        {
            var param = new FormUrlEncodedContent(values);
            using (HttpClient client = new HttpClient())
            {
                using (HttpResponseMessage response = await client.PostAsync(fileurl, param))
                {
                    
                    using (HttpContent content = response.Content)
                    {
                        var json = await content.ReadAsStringAsync();
                
                        var objects = JsonConvert.DeserializeObject<List<object>>(json);
                        var result = objects.Select(obj => JsonConvert.SerializeObject(obj)).ToArray();
                        myfiles = result;
                    }
                }
            }
        }

        public string GetMyInData()
        {
            return myindata;
        }

        /// <summary>
        /// Post to server: To get data  stored on cloud.
        /// Sets Class string myindata Attribute
        /// </summary>
        /// <param name="fileIn"> Name of file to post to Cloud Server</param>
        /// <returns> string in Json format</returns>
        public async Task SetMyInData(string fileIn)
        {
            values["file"] = fileIn;
            var param = new FormUrlEncodedContent(values);
            Console.WriteLine(values["file"]);
            using (HttpClient client = new HttpClient())
            {
                using (HttpResponseMessage response = await client.PostAsync(indataurl, param))
                {
                    Console.WriteLine(response);
                    using (HttpContent content = response.Content)
                    {
                        var json = await content.ReadAsStringAsync();
                        myindata = json;
                    }
                }
            }
        }

        
        public string GetMyOutData()
        {
            return myoutdata;
        }

        /// <summary>
        /// Post to server: To save data on Cloud Server.
        /// Sets Class string myoutdata Attribute
        /// </summary>
        /// <param name="fileIn"> Name of file to post to Cloud Server</param>
        /// /// <param name="fileIn"> Data (Json Format) to post to Cloud Server</param>
        /// <returns> string in Json format</returns>
        public async Task SetMyOutData(string fileIn, string dataIn)
        {
            values["file"] = fileIn;
            values["data"] = dataIn;
            var param = new FormUrlEncodedContent(values);
            using (HttpClient client = new HttpClient())
            {
                using (HttpResponseMessage response = await client.PostAsync(outdataurl, param))
                {
                    using (HttpContent content = response.Content)
                    {
                        myoutdata = await content.ReadAsStringAsync();
                        Console.WriteLine(GetMyOutData());
                    }
                }
            }
        }

    }
}

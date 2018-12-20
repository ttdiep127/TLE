using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.AppModels
{
    public class ResponseOutput
    {
        public bool Success;
        public string Message;
        public object Data;

        public ResponseOutput()
        {
        }
        public ResponseOutput(bool v1)
        {
            Success = v1;
            Message = null;
            Data = null;
        }

        public ResponseOutput(bool v1, string v2)
        {
            Success = v1;
            Message = v2;
            Data = null;
        }

        public ResponseOutput(bool v1, object v2)
        {
            Success = v1;
            Data = v2;
        }

        public ResponseOutput(bool v1, string v2, object v3) {
            Success = v1;
            Message = v2;
            Data = v3;
        }
    }
}

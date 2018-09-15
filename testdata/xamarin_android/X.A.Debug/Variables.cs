
using System.Diagnostics;

namespace X.A.Debug
{
    public class Variables 
    {        
        public string testFieldString = "test_string_value";

        public void VariablesFlow() {
            var localIntVariable = 3;
            var localArrayVariable = new int[] { 1, 2 };
        }
    }
}


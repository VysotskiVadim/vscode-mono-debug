
using System;

namespace X.A.Debug
{
    public static class Lambda 
    {        
        public static void LabdaFlow() {
            Func<int, int> testFunction = (int number) => {
                var result = number + 1;
                return result;
            };
            testFunction(4);
        }
    }
}


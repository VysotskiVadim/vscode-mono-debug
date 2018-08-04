using Android.App;
using Android.Widget;
using Android.OS;
using System.Diagnostics;

namespace X.A.Debug
{
    [Activity(Label = "X.A. Debug", MainLauncher = true, Icon = "@mipmap/icon")]
    public class MainActivity : Activity
    {
        int count = 1;

        protected override void OnCreate(Bundle savedInstanceState)
        {
            base.OnCreate(savedInstanceState);
            Debugger.Break();
        }
    }
}


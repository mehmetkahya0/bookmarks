// a function to be appended to a button's onclick attribute
// that redirects them through the repl auth flow

// Example:
// <button onclick="LoginWithReplit()">Login With Replit</button>
function LoginWithReplit() {
    window.addEventListener('message', authComplete);
    var h = 500;
    var w = 350;
    var left = screen.width / 2 - w / 2;
    var top = screen.height / 2 - h / 2;
  
    var authWindow = window.open(
      'https://repl.it/auth_with_repl_site?domain=' + location.host,
      '_blank',
      'modal =yes, toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' +
        w +
        ', height=' +
        h +
        ', top=' +
        top +
        ', left=' +
        left,
    );
  
    function authComplete(e) {
      if (e.data !== 'auth_complete') {
        return;
      }
  
      window.removeEventListener('message', authComplete);
  
      authWindow.close();
      location.reload();
    }
  }
  
  //fetches from /__replauthuser to get the user info
  
  // Example:
  // <script type="module"> const user = await getUserInfo() </script>
  async function getUserInfo() {
    return fetch('/__replauthuser')
      .then((e) => e.json())
      .then((userInfo) => {
        if (!userInfo) {
          return null;
        }
  
        return userInfo;
      })
      .catch(() => {
        return null;
      });
  }
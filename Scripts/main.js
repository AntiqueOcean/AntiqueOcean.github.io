const docE = document.documentElement;
const commandArea = document.getElementById('command-area');
const inputArea = document.getElementById('input-area');
const inputForm = document.getElementById('input-form');
const inputText = document.getElementById('input-text');
const inputUsername = document.getElementById('username');
const scrollButton = document.getElementById('scrollButton');
const postItem = document.getElementById('post');
let inputList = [];
var currentListIndex = -1;

function replaceAttribute (element, attribute, from, to) {
    element.setAttribute (attribute, String(element.getAttribute(attribute)).replace(from, to));
}

window.setColor = function (input){
    const varient = 7;
    currentIndex = localStorage.getItem('ColorIndex');
    if (input > 0 && input <= varient) {
        replaceAttribute (docE,'class', 'color-' + currentIndex, 'color-' + input);
        localStorage.setItem('ColorIndex', input);
        return 'changed to color ' + input;
    }
    else
        return 'there is no color ' + input + ' [only 1 to ' + varient + ']';
}

function setFontSize(input){
    var varient = ['font-small', 'font-medium', 'font-big', 'font-huge'];
    var currentIndex = 1;
    var resultIndex = 1;

    for (i = 0; i < varient.length; i++)
        if (docE.getAttribute('class').indexOf(varient[i]) != -1) {
            currentIndex = i;
            currentIndex
            break;
        }
    resultIndex = currentIndex + input;
    if (resultIndex < 0) resultIndex = 0;
    if (resultIndex >= varient.length) resultIndex = varient.length - 1;
    replaceAttribute(docE, 'class', varient[currentIndex], varient[resultIndex]);
    localStorage.setItem('FontSize', varient[resultIndex]);
}

function find(input, items) {
    var result = -1;
    for (i = 0; i < input.length; i++)
        parent:
        for (p = 0; p < items.length; p++)
            if (input[i] === items[p]) {
                result = i;
                break parent;
            }
        
    return result;
}

function setAllUserName(){
    let allUsernames = document.querySelectorAll('[id=username]');
    allUsernames.forEach(element => {
        element.innerHTML = localStorage.getItem('UniqueUserName');});
}

{
    //set default font size
    if (localStorage.getItem('FontSize') === null)
        localStorage.setItem('FontSize', 'font-medium');
    else {
        replaceAttribute (docE, 'class', 'font-medium', localStorage.getItem('FontSize'));
    }

    //set default color index
    if (localStorage.getItem('ColorIndex') === null)
        localStorage.setItem('ColorIndex', '1');
    else {
        replaceAttribute (docE, 'class', 'color-1', 'color-' + localStorage.getItem('ColorIndex'));
    }

    //set default username
    if (localStorage.getItem('UniqueUserName') === null)
    {
        localStorage.setItem('UniqueUserName', 'guest');
        document.getElementById('username').innerHTML = 'guest';
    }
    else 
        setAllUserName();
        
    
}

function clearScreen() {
    let items = document.querySelectorAll('[id=old]')
    items.forEach(element => {
        element.remove();
    });
}


function proccess(input) {
    const content = out(input);
    if (content != "!skip") {
        const liTag = document.createElement("li", );
        liTag.setAttribute('id', 'old');
        const usernameTag = document.createElement("a");
        const usernameText = document.createTextNode( localStorage.getItem('UniqueUserName'));
        liTag.appendChild(usernameTag);
        usernameTag.appendChild(usernameText);
        
        const aTag = document.createElement("a");
        const atext = document.createTextNode(input);
        aTag.appendChild(atext);
        liTag.appendChild(aTag);

        const spanTag = document.createElement("span");
        const spanText = document.createTextNode(content);
        spanTag.appendChild(spanText);
        liTag.appendChild(spanTag);
        inputArea.parentNode.insertBefore(liTag, inputArea);
    }
};

function onSubmit(event) {
    event.preventDefault();
    proccess (inputText.value);
    commandArea.scrollTop = commandArea.scrollHeight;
    inputList.unshift(inputText.value);
    currentListIndex = -1;
    inputText.value = '';
}
inputForm.addEventListener('submit', onSubmit);

function focus(){
    inputText.focus();
}
commandArea.addEventListener ('click', focus);

function scrollDown(){
    postItem.scrollIntoView({behavior: 'smooth', block: 'start'});
}
scrollButton.addEventListener('click', scrollDown);

document.addEventListener("keydown", (e) => {
    e = e || window.event;
    if (document.activeElement === inputText) {
        if (e.key === 'ArrowUp' && currentListIndex < inputList.length-1) {
            currentListIndex++;
            inputText.value = inputList[currentListIndex];
            inputText.selectionStart = inputText.selectionEnd = inputText.value.length;
        }
        else if (e.key === 'ArrowDown' && currentListIndex >= 0) {
            currentListIndex--;
            if (currentListIndex != -1) {

            inputText.value = inputList[currentListIndex];
            }
            else {
                inputText.value = '';
            }
            inputText.selectionStart = inputText.selectionEnd = inputText.value.length;
        }
    }
  });

function reveal() {
      var windowHeight = window.innerHeight;
      var elementTop = postItem.getBoundingClientRect().top;
      var elementVisible = 150;
      if (elementTop < windowHeight - elementVisible) {
        postItem.classList.add("active");
      } else {
        postItem.classList.remove("active");
      }
  }
  window.addEventListener("scroll", reveal);
  reveal();

function out(_input) {
    var input = _input.trim().toLowerCase();

    switch(input){
        case '':
            return '!skip';
        case 'help':
        return String('╔═════╬═╡ H E L P ╞═╬═════╗\r\n\
╠═■ List of Available Commands:\r\n\
║\r\n\
╟── get [info] : get\'s information!\r\n\
║ + [info] :\r\n\
║ id [platform]\r\n\
║ number\r\n\
║ name\r\n\
║ email\r\n\
║ + [platform]:\r\n\
║ telegram\r\n\
║ telegram-channel\r\n\
║ reddit\r\n\
║ twitch\r\n\
║ youtube\r\n\
╟── set [option] : sets options!\r\n\
║ + [option]:\r\n\
║ color [+ index 1-6]\r\n\
║ fontsize [up, down]\r\n\
║ username\r\n\
║ └ you can set your user name with "set username [name]"\r\n\
╟── clear : clears anything above.\r\n\
╟── clear cache: clears cache and reloads the page.\r\n\
╟── refresh : refresh webpage.\r\n\
╟── exit : closes this tab.\r\n\
╚═╬╡\r\n\
                        ');
        case 'get':
            return String("invalid input, add requiring information after \"get\".");
        case 'get id':
            return String("invalid, add requiring platform after \"id\".");
        case 'get id telegram':
            return String("@AntiqueOcean");
        case 'get id t':
            return String("@AntiqueOcean");
        case 'get id telegram-channel':
            return String("@AntiqueOcean_ch");
        case 'get id twitch':
            return String("twitch.tv/antiqueocean");
        case 'get id reddit':
            return String("u/antiqueocean");
        case 'get id youtube':
            return String("@antiqueocean8561");
        case 'get number':
            return String("+98 993 992 7949");
        case 'get email':
            return String("AntiqueOcean.dev@gmail.com");
        case 'get mail':
            return String("AntiqueOcean.dev@gmail.com");
        case 'get name':
            return String("Muhammad Ali Kalantari");
        case 'set':
            return String("invalid input, add setting data after \"set\".");
        case 'set username':
            return String("invalid input, add name after \"username\".");
        case 'set username':
            return String("invalid input, add name after \"username\".");
        case 'set fontsize':
            return String("invalid input, add up/down after \"font-size\".");
        case 'set fontsize up': {
            setFontSize(1);
            return String("font size incereased.");
        }
        case 'set fontsize down': {
            setFontSize(-1);
            return String("font size decreased.");
        }
        case 'set color': {
            return String("invalid input, add index after \"color\".");
        }
        case 'clear': {
            clearScreen();
            return String("!skip")
        }
        case 'clear cache': {
            localStorage.clear();
            location.reload();
            return String(" ...")
        }
        case 'refresh': {
            location.reload();
            return(' ...');
        }
        case 'reload': {
            location.reload();
            return(' ...');
        }
        case 'exit': {
            close();
            return('your browser blocks this page from closing, you need to turn on the feature that lets webpages close themselve. firefox: first go to "about:config" and then set "dom.allow_scripts_to_close_windows" to true.');
        }
        default: {
            if (input.indexOf("set username ") != -1)
            {
                var username = String(input).replace("set username", "");
                localStorage.setItem("UniqueUserName", username.trim());
                setAllUserName();
                return String("username changed to: " +  username.trim());
            }
            if (input.indexOf("set color ") != -1)
            {
                var index = String(input).replace("set color", "").trim();
                return setColor(index);
            }
            else 
            return String('Err: The syntax "' + input + '" is not defined');
        }
    }
}
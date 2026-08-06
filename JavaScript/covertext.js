const displayText = document.getElementById("covertext");
msg = "Hi, I'm Soutrik";
x = 0;

function textTyper()
{
    if (x<msg.length)
    {
        displayText.textContent += msg.charAt(x);
        x++;
        setTimeout(textTyper, 500);
    }
}

textTyper();
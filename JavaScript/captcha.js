const form = document.getElementById('contactform');

function captcha(e)
{
    const hCaptcha = form.querySelector('textarea[name=h-captcha-response]').value;

    if (!hCaptcha)
        {
            e.preventDefault();
            alert("Please fill out captcha field before submitting!")
            return
        }
}

form.addEventListener('submit', captcha);
function generateMessage() { 
    document.getElementById("contactHeadingsAndForm").style.display = "none";
    document.getElementById("contactMessage").style.display = "block";

    let name = document.getElementById("name").value;
    let nameCapitalized = name.charAt(0).toUpperCase() + name.slice(1);

    let messageArea = document.getElementById("contactMessage");
    let message = document.createTextNode("Thank you for subscribing to our newsletter " + nameCapitalized + "!");
    messageArea.appendChild(message);
}
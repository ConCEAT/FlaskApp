var orderedChallanges;
var size = constChallanges.length;

function handleForm(event) {
    event.preventDefault();
    SubmitNumber();
}

function OnLoad() {
    var numberForm = document.getElementById("numberForm");   
    numberForm.addEventListener('submit', handleForm);
    document.getElementById("size").innerHTML = size;
    Shuffle();
};

function Shuffle() {
    orderedChallanges = constChallanges;
    for (var i = size - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = orderedChallanges[i];
        orderedChallanges[i] = orderedChallanges[j];
        orderedChallanges[j] = temp;
    };
    document.getElementById("cardTitle").innerHTML = "Dobrej zabawy!"
    document.getElementById("cardSubtitle").innerHTML = "Zadania zostały przetasowane."
    ClearHistory();
};

function SubmitNumber() {
    var number, title, subtitle;
    number = document.getElementById("numberOfChallange").value;
    if (isNaN(number) || number < 1 || number > size) {
        title = `Nie możemy znaleźć zadania o numerze ${number}`;
    } else {
        challange = orderedChallanges[number-1]
        title = challange.Title
        subtitle = challange.Subtitle
    };
    document.getElementById("cardTitle").innerHTML = title;
    if (subtitle === undefined) {
        document.getElementById("cardSubtitle").innerHTML = "";   
    } else {
        document.getElementById("cardSubtitle").innerHTML = subtitle;
        AppendToHistory(title,subtitle);
    };
    document.getElementById("numberForm").reset();
};

function ClearHistory() {
    var historyList = document.getElementById("HistoryList");
    while (historyList.firstChild){
        historyList.removeChild(historyList.firstChild);
    };
    let tag = document.createElement("p");
    tag.className = "secondary-text text-center";
    tag.id = "HistoryInformation";
    tag.innerHTML = "Historia gry jest pusta.";
    historyList.appendChild(tag);
}

function AppendToHistory(title, subtitle) {
    if (document.getElementById("HistoryInformation").value != ""){
        document.getElementById("HistoryInformation").innerHTML = ""
    };
    var historyList = document.getElementById("HistoryList");
    //get id
    var id;
    if (historyList.firstChild.id === "HistoryInformation"){
        id = 1;
    } else {
        id = parseInt(historyList.firstChild.id) + 1;
    };
    //container
    var container = document.createElement("li");
    container.id = id;
    //title
    var titleContainer = document.createElement("button");
    setAttributes(titleContainer,{
        "class":"btn collapsed mx-2 my-1 px-2 py-1",
        "type":"button",
        "data-toggle":"collapse",
        "data-target":`#collapse${id}`,
        "aria-expanded":"false",
        "aria-controls":`collapse${id}`
    });
    var titleParagraph = document.createElement("p");
    setAttributes(titleParagraph,{
        "class":"display-7 mb-0",
        "id":`heading${id}`
    });
    titleParagraph.innerHTML = title;
    titleContainer.appendChild(titleParagraph);
    //content
    var contentContainer = document.createElement("div");
    setAttributes(contentContainer,{
        "class":"collapse",
        "id":`collapse${id}`,
        "aria-labelledby":`heading${id}`,
        "data-parent":"#HistoryList"
    });
    var contentBody = document.createElement("div");
    contentBody.className = "card-body py-2";
    contentBody.innerHTML = subtitle;
    contentContainer.appendChild(contentBody);
    //attach child nodes
    container.appendChild(titleContainer);
    container.appendChild(contentContainer);
    historyList.insertBefore(container,historyList.firstChild);
};

function setAttributes(element, attributes) {
    for (var key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}
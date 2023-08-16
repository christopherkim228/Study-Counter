var rawExcel;
var processedJson;
var startDate;
var currentDate;
var convertedDate;

// $("#datepicker").datepicker();
document.getElementById("fileInput").addEventListener("change", readExcel);
$('#datepicker').datepicker({
    onSelect: function(dateText) { 
        // console.log("selected"); 
        currentDate = $('#datepicker').datepicker("getDate"); 
        convertedDate = 25569.0 + ((currentDate - ((new Date()).getTimezoneOffset() * 60 * 1000)) / (1000 * 60 * 60 * 24));
        updateNumbers();
    }
});

function readExcel(e) {
    let input = e.target;
    let reader = new FileReader();
    reader.onload = function () {
        let data = reader.result;
        let workBook = XLSX.read(data, { type: 'binary' });
        rawExcel = workBook;
        workBook.SheetNames.forEach(function (sheetName) {
            // console.log('SheetName: ' + sheetName);
            let rows = XLSX.utils.sheet_to_json(workBook.Sheets[sheetName]);
            processedJson = rows;
            // console.log(JSON.stringify(rows));
            startDate = processedJson[0].__EMPTY
        })
    };
    reader.readAsBinaryString(input.files[0]);
}

function updateNumbers() {
    let korNum = 0;
    let matNum = 0;
    let engNum = 0;
    let c = convertedDate - startDate;
    for(let i=0; i <= c; i++) {
        korNum += processedJson[i].국어;
        matNum += processedJson[i].수학;
        engNum += processedJson[i].영어;
        // console.log(korNum + ', '+ matNum + ', ' + engNum)
    }
    document.getElementById("koreanNumber").innerText = korNum;
    document.getElementById("mathNumber").innerText = matNum;
    document.getElementById("englishNumber").innerText = engNum;
    document.getElementById("koreanDelta").innerText = "+" + processedJson[c].국어;
    document.getElementById("mathDelta").innerText = "+" + processedJson[c].수학;
    document.getElementById("englishDelta").innerText = "+" + processedJson[c].영어;
}
const xlsx = require('xlsx');

class UploadService {

    generateExcelByJson(filename) {

        var wb = xlsx.readFile(`public/media/${filename}`, {cellDates: true});
        var ws = wb.Sheets['Página1'];

        return xlsx.utils.sheet_to_json(ws);

    }

}

module.exports = new UploadService;
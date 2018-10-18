"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var puppeteer = require('puppeteer');
var devices = require('puppeteer/DeviceDescriptors');
var fs = require('fs');
var delay = require('delay');
var Apify = require('apify');
var randomUA = require('modern-random-ua');
var ConvertCsvRawFilesToJson_1 = require("./ConvertCsvRawFilesToJson");
var ScrapperIdealistaPuppeteer = /** @class */ (function () {
    function ScrapperIdealistaPuppeteer() {
        var _this = this;
        this.json_dir = "json_polylines_municipios";
        this.outputTempDir = "tmp/";
        this.config = require("./scraping_config.json");
        this.files = fs.readdirSync(this.json_dir);
        this.timoutTimeSearches = 1000;
        this.timoutTimeCapchaDetected = 5 * 60 * 1000;
        this.sessionId = this.config.sessionId;
        this.convertCsvRawFilesToJson = new ConvertCsvRawFilesToJson_1.ConvertCsvRawFilesToJson();
        this.MongoClient = require('mongodb').MongoClient;
        this.date = "";
        this.initalizePuppeteer = function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, Apify.launchPuppeteer({
                                userAgent: randomUA.generate(),
                                headless: true,
                                args: ['--no-sandbox', '--disable-setuid-sandbox']
                            })];
                    case 1:
                        _a.browser = _c.sent();
                        _b = this;
                        return [4 /*yield*/, this.browser.newPage()];
                    case 2:
                        _b.page = _c.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        this.extractPrize = function (urlVenta) { return __awaiter(_this, void 0, void 0, function () {
            var averagePrize, numberOfElements, elementPrize, text, elementNumber, textNumber;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.page.goto(urlVenta)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.page.screenshot({ path: 'example.png' })];
                    case 2:
                        _a.sent();
                        averagePrize = '0';
                        numberOfElements = '0';
                        return [4 /*yield*/, this.detectedNoResultsPage()];
                    case 3:
                        if (!!(_a.sent())) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.page.$(".items-average-price")];
                    case 4:
                        elementPrize = _a.sent();
                        return [4 /*yield*/, this.page.evaluate(function (element) { return element.textContent; }, elementPrize)];
                    case 5:
                        text = _a.sent();
                        averagePrize = text.replace("Average price:", "").replace("eur/m²", "").replace(",", "").trim();
                        return [4 /*yield*/, this.page.$(".h1-simulated")];
                    case 6:
                        elementNumber = _a.sent();
                        return [4 /*yield*/, this.page.evaluate(function (element) { return element.textContent; }, elementNumber)];
                    case 7:
                        textNumber = _a.sent();
                        numberOfElements = textNumber.replace(" ", "").trim();
                        _a.label = 8;
                    case 8: return [2 /*return*/, { averagePrize: averagePrize, numberOfElements: numberOfElements }];
                }
            });
        }); };
        this.detectedNoResultsPage = function () { return __awaiter(_this, void 0, void 0, function () {
            var found, pagetxt, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.page.content()];
                    case 1:
                        pagetxt = _a.sent();
                        found = pagetxt.indexOf('t found what you are looking', 1) > -1;
                        if (found) {
                            console.log("no results found");
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/, found];
                }
            });
        }); };
        this.saveInCsv = function (extractedData, json_file) {
            if (json_file) {
                var header = "CUSEC;NMUN;V_VENTA;N_VENTA;V_ALQL;N_ALQL;FECHA\n";
                var outputFilename = "./" + _this.outputTempDir + json_file.replace(".json", "_scraped.csv");
                fs.writeFileSync(outputFilename, header);
                for (var _i = 0, _a = extractedData.scrapedData; _i < _a.length; _i++) {
                    var data = _a[_i];
                    var newLine = void 0;
                    if (data.cusec) {
                        newLine = data.cusec + ";" + data.nmun + ";" + data.precio_medio_venta + ";" + data.numero_anuncios_venta + ";" + data.precio_medio_alquiler + ";" + data.numero_anuncios_alquiler + ";" + data.fecha + "\n";
                        fs.appendFileSync(outputFilename, newLine);
                    }
                }
            }
        };
        this.detectCapcha = function (data) { return __awaiter(_this, void 0, void 0, function () {
            var found, pagetxt, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        found = false;
                        if (!(!data.precio_medio_venta && !data.precio_medio_alquiler)) return [3 /*break*/, 7];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        return [4 /*yield*/, this.page.content()];
                    case 2:
                        pagetxt = _a.sent();
                        found = pagetxt.indexOf('Vaya! parece que estamos recibiendo muchas peticiones', 1) > -1;
                        if (!found) return [3 /*break*/, 5];
                        console.log("--------------------\n Captcha ha saltado!");
                        console.log("esperando...");
                        return [4 /*yield*/, this.page.waitFor(this.timoutTimeCapchaDetected)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.initalizePuppeteer()];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_2 = _a.sent();
                        return [2 /*return*/, false];
                    case 7: return [2 /*return*/, found];
                }
            });
        }); };
        this.updateFileMunicipio = function (municipio, json_dir) {
            var outputFilename = "./" + json_dir + "/" + municipio.fileName;
            fs.writeFileSync(outputFilename, JSON.stringify(municipio));
        };
        this.saveDataForMunicipio = function (data, json_file) {
            var jsonDataFile = json_file.replace(".json", "_scraped.json");
            if (!fs.existsSync(_this.outputTempDir)) {
                fs.mkdirSync("./" + _this.outputTempDir);
            }
            var outputFilename = "./" + _this.outputTempDir + jsonDataFile;
            fs.writeFileSync(outputFilename, JSON.stringify(data));
        };
    }
    ScrapperIdealistaPuppeteer.prototype.finalizeSession = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.sessionId = "scraping" + "----" + this.date;
                        this.config.sessionId = this.sessionId;
                        fs.writeFileSync('scraping_config.json', JSON.stringify(this.config));
                        return [4 /*yield*/, this.convertCsvRawFilesToJson.convert()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ScrapperIdealistaPuppeteer.prototype.initializeSession = function () {
        this.date = new Date().toLocaleString().replace(/:/g, '_').replace(/ /g, '_').replace(/\//g, '_');
        this.outputTempDir = this.outputTempDir + this.sessionId + "/";
        this.sessionId = this.config.sessionId;
        console.log("\n-------------------------------------------------------");
        console.log("starting execution " + this.sessionId);
        console.log("\n-------------------------------------------------------");
    };
    ScrapperIdealistaPuppeteer.prototype.main = function () {
        var _this = this;
        Apify.main(function () { return __awaiter(_this, void 0, void 0, function () {
            var _i, _a, json_file, municipio, cusecs, extractedData, continueScraping, i, cusec, capchaFound, data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.initializeSession();
                        //files = ["./test_polylines_2011_ccaa12.json"];
                        console.log(this.files);
                        //const csv_file = "./csv_polylines_municipios/test_polylines_2011_ccaa12.csv"
                        console.log(this.date);
                        _i = 0, _a = this.files;
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 14];
                        json_file = _a[_i];
                        municipio = require("./" + this.json_dir + "/" + json_file);
                        if (!municipio._id) {
                            municipio._id = this.sessionId;
                        }
                        if (!!municipio.municipioScraped) return [3 /*break*/, 13];
                        cusecs = municipio.cusecs;
                        extractedData = this.initializeDataForMunicipio(json_file);
                        return [4 /*yield*/, this.initalizePuppeteer()];
                    case 2:
                        _b.sent();
                        continueScraping = true;
                        i = 0;
                        _b.label = 3;
                    case 3:
                        if (!continueScraping) return [3 /*break*/, 10];
                        cusec = cusecs[i];
                        capchaFound = false;
                        data = void 0;
                        if (!!cusec.alreadyScraped) return [3 /*break*/, 9];
                        return [4 /*yield*/, this.page.setUserAgent(randomUA.generate())];
                    case 4:
                        _b.sent();
                        return [4 /*yield*/, this.page.emulate(devices['iPhone 6'])];
                    case 5:
                        _b.sent();
                        return [4 /*yield*/, this.extractDataAlquilerVenta(municipio, cusec)];
                    case 6:
                        data = _b.sent();
                        return [4 /*yield*/, this.page.waitFor(this.timoutTimeSearches)];
                    case 7:
                        _b.sent();
                        console.log(data);
                        return [4 /*yield*/, this.detectCapcha(data)];
                    case 8:
                        capchaFound = _b.sent();
                        _b.label = 9;
                    case 9:
                        if (!capchaFound) {
                            if (data) {
                                extractedData.scrapedData.push(data);
                            }
                            this.saveDataForMunicipio(extractedData, json_file);
                            if (municipio.cusecs[i])
                                municipio.cusecs[i].alreadyScraped = true;
                            this.updateFileMunicipio(municipio, this.json_dir);
                            i = i + 1;
                            continueScraping = (i < cusecs.length);
                        }
                        return [3 /*break*/, 3];
                    case 10:
                        municipio.municipioScraped = true;
                        if (!this.config.useMongoDb) return [3 /*break*/, 12];
                        return [4 /*yield*/, this.insertExtractedDataMongo(extractedData)];
                    case 11:
                        _b.sent();
                        _b.label = 12;
                    case 12:
                        this.updateFileMunicipio(municipio, this.json_dir);
                        this.saveInCsv(extractedData, json_file);
                        _b.label = 13;
                    case 13:
                        _i++;
                        return [3 /*break*/, 1];
                    case 14: return [4 /*yield*/, this.finalizeSession()];
                    case 15:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    };
    ScrapperIdealistaPuppeteer.prototype.extractDataAlquilerVenta = function (municipio, cusec) {
        return __awaiter(this, void 0, void 0, function () {
            var urlVenta, data, extractedVenta, error_3, urlAlql, extractedAlql, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        urlVenta = "https://www.idealista.com/en/areas/venta-viviendas/?shape=" + cusec.urlEncoded;
                        console.log("extrayendo datos de venta para " + municipio.fileName + " \n" + urlVenta);
                        data = { fecha: this.date, cusec: cusec.cusec, nmun: cusec.nmun, precio_medio_venta: undefined, numero_anuncios_venta: undefined, precio_medio_alquiler: undefined, numero_anuncios_alquiler: undefined };
                        data["_id"] = cusec.cusec + "--" + this.date;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.extractPrize(urlVenta)];
                    case 2:
                        extractedVenta = _a.sent();
                        data["precio_medio_venta"] = extractedVenta.averagePrize;
                        data["numero_anuncios_venta"] = extractedVenta.numberOfElements;
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _a.sent();
                        console.log("error");
                        return [3 /*break*/, 4];
                    case 4: return [4 /*yield*/, this.page.waitFor(this.timoutTimeSearches)];
                    case 5:
                        _a.sent();
                        urlAlql = "https://www.idealista.com/en/areas/alquiler-viviendas/?shape=" + cusec.urlEncoded;
                        console.log("extrayendo datos de alquiler para " + municipio.fileName + " \n" + urlAlql);
                        _a.label = 6;
                    case 6:
                        _a.trys.push([6, 8, , 9]);
                        return [4 /*yield*/, this.extractPrize(urlAlql)];
                    case 7:
                        extractedAlql = _a.sent();
                        data["precio_medio_alquiler"] = extractedAlql.averagePrize;
                        data["numero_anuncios_alquiler"] = extractedAlql.numberOfElements;
                        return [3 /*break*/, 9];
                    case 8:
                        error_4 = _a.sent();
                        console.log("error");
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/, data];
                }
            });
        });
    };
    ScrapperIdealistaPuppeteer.prototype.initializeDataForMunicipio = function (json_file) {
        var jsonDataFile = json_file.replace(".json", "_scraped.json");
        var nmun = json_file.split("_")[0];
        if (fs.existsSync(this.outputTempDir + " /" + jsonDataFile)) {
            var data = require("./" + this.outputTempDir + jsonDataFile);
            data._id = nmun + "--" + this.sessionId;
            if (!data.nmun) {
                data.nmun = nmun;
            }
            return data;
        }
        var extractedData = { _id: nmun + "--" + this.sessionId, sessionId: this.sessionId, nmun: nmun, scrapedData: [] };
        return extractedData;
    };
    ScrapperIdealistaPuppeteer.prototype.insertExtractedDataMongo = function (extractedData) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.MongoClient.connect(this.config.mongoUrl, function (err, client) {
                            var db = "realstate-db";
                            var collectionName = "summaries";
                            console.log("saving data in mongodb");
                            var collection = client.db(db).collection(collectionName);
                            collection.save(extractedData);
                            client.close();
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return ScrapperIdealistaPuppeteer;
}());
exports.ScrapperIdealistaPuppeteer = ScrapperIdealistaPuppeteer;
//------------------MAIN PROGRAM-------------------------
var scraper = new ScrapperIdealistaPuppeteer();
scraper.main();

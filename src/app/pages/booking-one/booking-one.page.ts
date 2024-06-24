import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonContent, IonTitle, IonToolbar, IonButtons, IonBackButton, IonGrid, IonRow, IonProgressBar, IonCol } from "@ionic/angular/standalone";
import { HeaderMainComponent } from "../../shared/components/header-main/header-main.component";
import { GlbService } from "../../shared/services/glb/glb.service";
import { ApiService } from "../../shared/services/api/api.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking-one',
  templateUrl: './booking-one.page.html',
  styleUrls: ['./booking-one.page.scss'],
  standalone: true,
  imports: [IonCol, IonProgressBar, IonRow, IonGrid, IonBackButton, IonButtons, IonToolbar, IonTitle, IonContent, IonHeader, CommonModule, FormsModule, HeaderMainComponent]
})
export class BookingOnePage implements OnInit {

  constructor(
    private glbService: GlbService,
    private router: Router,
    private apiService: ApiService) {
    this.glbService.flightSelected.length == 0 ? this.router.navigate(['/home']) : this.loadResult();;
  }


  ngOnInit() {
  }

  async loadResult() {
    let passengersGroup: any = [];
    let segmentGroup: any = [];
    console.log('this.glbService.flightSelected: ', this.glbService.flightSelected);
    if (this.glbService.flightSelected) {
      let contPax = 1, contItem = 0;
      for (let i = 0; i < this.glbService.flightSelected.pax.length; i++) {
        if (this.glbService.flightSelected.pax[i].paxReference[0].ptc[0] == 'ADT') {
          let travellerDetails = [];
          for (let j = 0; j < this.glbService.flightSelected.pax[i].paxReference[0].traveller.length; j++) { travellerDetails.push({ measurementValue: [(contPax++) + ''] }); }
          passengersGroup.push({ segmentRepetitionControl: [{ segmentControlDetails: [{ quantity: ["1"], numberOfUnits: [this.glbService.flightSelected.pax[i].paxReference[0].traveller.length + ''] }] }], travellersID: [{ travellerDetails: travellerDetails }], discountPtc: [{ valueQualifier: ["ADT"] }] });
        }
        if (this.glbService.flightSelected.pax[i].paxReference[0].ptc[0] == 'CNN') {
          let travellerDetails = [];
          for (let k = 0; k < this.glbService.flightSelected.pax[i].paxReference[0].traveller.length; k++) { travellerDetails.push({ measurementValue: [(contPax++) + ''] }); }
          passengersGroup.push({ segmentRepetitionControl: [{ segmentControlDetails: [{ quantity: ["2"], numberOfUnits: [this.glbService.flightSelected.pax[i].paxReference[0].traveller.length + ''] }] }], travellersID: [{ travellerDetails: travellerDetails }], discountPtc: [{ valueQualifier: ["CH"] }] });
        }
        if (this.glbService.flightSelected.pax[i].paxReference[0].ptc[0] == 'INF') {
          let travellerDetails = [];
          for (let l = 0; l < this.glbService.flightSelected.pax[i].paxReference[0].traveller.length; l++) { travellerDetails.push({ measurementValue: [(l + 1) + ''] }); }
          passengersGroup.push({ segmentRepetitionControl: [{ segmentControlDetails: [{ quantity: ["3"], numberOfUnits: [this.glbService.flightSelected.pax[i].paxReference[0].traveller.length + ''] }] }], travellersID: [{ travellerDetails: travellerDetails }], discountPtc: [{ valueQualifier: ["INF"], fareDetails: [{ qualifier: ["766"] }] }] });
        }
        console.log('passengersGroup: ', passengersGroup);
      }
      console.log('total pasajeros: ', contPax - 1);
      for (let x = 0; x < this.glbService.flightSelected.ida.flightDetails.length; x++) {
        contItem++;
        segmentGroup.push({
          segmentInformation: [{
            flightDate: [{ departureDate: [this.glbService.flightSelected.ida.flightDetails[x].flightInformation[0].productDateTime[0].dateOfDeparture[0]], departureTime: [this.glbService.flightSelected.ida.flightDetails[x].flightInformation[0].productDateTime[0].timeOfDeparture[0]] }],
            boardPointDetails: [{ trueLocationId: [this.glbService.flightSelected.ida.flightDetails[x].flightInformation[0].location[0].locationId[0]] }],
            offpointDetails: [{ trueLocationId: [this.glbService.flightSelected.ida.flightDetails[x].flightInformation[0].location[1].locationId[0]] }],
            companyDetails: [{ marketingCompany: [this.glbService.flightSelected.ida.flightDetails[x].flightInformation[0].companyId[0].marketingCarrier[0]] }],
            flightIdentification: [{ flightNumber: [this.glbService.flightSelected.ida.flightDetails[x].flightInformation[0].flightOrtrainNumber[0]], bookingClass: [this.glbService.flightSelected.pax[0].fareDetails[x].groupOfFares[0].productInformation[0].cabinProduct[0].cabin[0]] }],
            flightTypeDetails: [{ flightIndicator: ["1"] }],
            itemNumber: [contItem + ""]
          }]
        });
      }
      for (let y = 0; y < this.glbService.flightSelected.vuelta.flightDetails.length; y++) {
        contItem++;
        segmentGroup.push({
          segmentInformation: [{
            flightDate: [{ departureDate: [this.glbService.flightSelected.vuelta.flightDetails[y].flightInformation[0].productDateTime[0].dateOfDeparture[0]], departureTime: [this.glbService.flightSelected.vuelta.flightDetails[y].flightInformation[0].productDateTime[0].timeOfDeparture[0]] }],
            boardPointDetails: [{ trueLocationId: [this.glbService.flightSelected.vuelta.flightDetails[y].flightInformation[0].location[0].locationId[0]] }],
            offpointDetails: [{ trueLocationId: [this.glbService.flightSelected.vuelta.flightDetails[y].flightInformation[0].location[1].locationId[0]] }],
            companyDetails: [{ marketingCompany: [this.glbService.flightSelected.vuelta.flightDetails[y].flightInformation[0].companyId[0].marketingCarrier[0]] }],
            flightIdentification: [{ flightNumber: [this.glbService.flightSelected.vuelta.flightDetails[y].flightInformation[0].flightOrtrainNumber[0]], bookingClass: [this.glbService.flightSelected.pax[0].fareDetails[y].groupOfFares[0].productInformation[0].cabinProduct[0].cabin[0]] }],
            flightTypeDetails: [{ flightIndicator: ["2"] }],
            itemNumber: [contItem + ""]
          }]
        });
      }
    }
    const body: any = {
      data: {
        "soapenv:Body": {
          Fare_InformativePricingWithoutPNR: [
            {
              passengersGroup: passengersGroup,
              segmentGroup: segmentGroup,
              pricingOptionGroup: [
                { pricingOptionKey: [{ pricingOptionKey: ["RP"] }] },
                { pricingOptionKey: [{ pricingOptionKey: ["RLO"] }] },
                { pricingOptionKey: [{ pricingOptionKey: ["FCO"] }], currency: [{ firstCurrencyDetails: [{ currencyQualifier: ["FCO"], currencyIsoCode: ["COP"] }] }] }
              ]
            }
          ]
        }
      }
    }
    const bookingResponse: any = await this.apiService.post('/travel/informative_pricing_without_pnr', body);
    console.log('bookingResponse: ', bookingResponse);
    this.airSellFromRecommendation(bookingResponse.data["soapenv:Envelope"]["soapenv:Body"][0].Fare_InformativePricingWithoutPNRReply[0], bookingResponse.session);
  }
  async airSellFromRecommendation(response: any, session: any) {
    const respOk: any = response.mainGroup[0];
    let segmentInformation: any = [], relatedproductInformation: any = [];
    console.log('response: ', response);
    console.log('respOk: ', respOk);
    for (let i = 0; i < respOk.pricingGroupLevelGroup[0].fareInfoGroup[0].segmentLevelGroup.length; i++) {
      segmentInformation.push({
        travelProductInformation: [{
          flightDate: [{ departureDate: [respOk[i].segmentInformation[0].flightDate[0].departureDate[0]] }],
          boardPointDetails: [{ trueLocationId: [respOk[i].segmentInformation[0].boardPointDetails[0].trueLocationId[0]] }],
          offpointDetails: [{ trueLocationId: [respOk[i].segmentInformation[0].offpointDetails[0].trueLocationId[0]] }],
          companyDetails: [{ marketingCompany: [respOk[i].segmentInformation[0].companyDetails[0].marketingCompany[0]] }],
          flightIdentification: [{ flightNumber: [respOk[i].segmentInformation[0].flightIdentification[0].flightNumber[0]], bookingClass: [respOk[i].segmentInformation[0].flightIdentification[0].bookingClass[0]] }]
        }],
        relatedproductInformation: [{ quantity: ["2"], statusCode: ["NN"] }]
      });
    }
    for (let j = 0; j < respOk.pricingGroupLevelGroup; j++) {
      relatedproductInformation.push({ quantity: ["2"], statusCode: ["NN"] });
    }
    const body: any = {
      data: {
        "soap:Body": [
          {
            Air_SellFromRecommendation: [
              {
                messageActionDetails: [{ messageFunctionDetails: [{ messageFunction: ["183"], additionalMessageFunction: ["M1"] }] }],
                itineraryDetails: [
                  {
                    originDestinationDetails: [{ origin: ["BOG"], destination: ["MEX"] }],
                    message: [{ messageFunctionDetails: [{ messageFunction: ["183"] }] }],
                    segmentInformation: [
                      {
                        travelProductInformation: [{
                          flightDate: [{ departureDate: ["240724"] }],
                          boardPointDetails: [{ trueLocationId: ["BOG"] }],
                          offpointDetails: [{ trueLocationId: ["MEX"] }],
                          companyDetails: [{ marketingCompany: ["AM"] }],
                          flightIdentification: [{ flightNumber: ["762"], bookingClass: ["V"] }]
                        }],
                        relatedproductInformation: [
                          { quantity: ["2"], statusCode: ["NN"] }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    }
    const x = {
      "soapenv:Envelope": {
        "soapenv:Body": [
          {
            "Fare_InformativePricingWithoutPNRReply": [
              {
                $: { "xmlns": "http://xml.amadeus.com/TIPNRR_23_1_1A" },
                messageDetails: [
                  {
                    messageFunctionDetails: [{ businessFunction: ["1"], messageFunction: ["741"], responsibleAgency: ["1A"] }],
                    responseType: ["A"]
                  }
                ],
                mainGroup: [
                  {
                    dummySegment: [""],
                    convertionRate: [
                      {
                        conversionRateDetails: [{ rateType: ["BSR"], pricingAmount: ["4428.200289"] }],
                        otherConvRateDetails: [{ rateType: ["USR"], pricingAmount: ["0.929425"], dutyTaxFeeType: ["CO"] }]
                      }
                    ],
                    generalIndicatorsGroup: [{ generalIndicators: [{ priceTicketDetails: [{ indicators: ["I"] }] }] }],
                    pricingGroupLevelGroup: [
                      {
                        numberOfPax: [{ segmentControlDetails: [{ quantity: ["1"], numberOfUnits: ["1"] }] }],
                        passengersID: [{ travellerDetails: [{ measurementValue: ["1"] }] }],
                        fareInfoGroup: [
                          {
                            emptySegment: [""],
                            pricingIndicators: [
                              {
                                priceTariffType: ["I"],
                                productDateTimeDetails: [{ departureDate: ["250624"], departureTime: ["1326"] }],
                                companyDetails: [{ otherCompany: ["LH"] }]
                              }
                            ],
                            fareAmount: [
                              {
                                monetaryDetails: [{ typeQualifier: ["B"], amount: ["524.00"], currency: ["EUR"] }],
                                otherMonetaryDetails: [
                                  { typeQualifier: ["E"], amount: ["2320400"], currency: ["COP"] },
                                  { typeQualifier: ["712"], amount: ["3677300"], currency: ["COP"] }
                                ]
                              }
                            ],
                            textData: [
                              { freeTextQualification: [{ textSubjectQualifier: ["4"], informationType: ["15"] }], freeText: ["26JUN24PAR OS X/VIE OS LON278.12LX X/ZRH LX PAR285.66NUC563.78END ROE0", ".929425"] },
                              { freeTextQualification: [{ textSubjectQualifier: ["1"], informationType: ["1P1"] }], freeText: ["NON-REFUNDABLE"] },
                              { freeTextQualification: [{ textSubjectQualifier: ["1"], informationType: ["10"] }], freeText: ["FARE RESTRICTION MAY APPLY"] },
                              { freeTextQualification: [{ textSubjectQualifier: ["1"], informationType: ["1A49"] }], freeText: [" - SEE ADV PURCHASE"] },
                              { freeTextQualification: [{ textSubjectQualifier: ["1"], informationType: ["1A0"] }], freeText: ["FARE FAMILIES:    (ENTER FQFn FOR DETAILS, FXY FOR UPSELL)"] },
                              { freeTextQualification: [{ textSubjectQualifier: ["1"], informationType: ["1A0"] }], freeText: ["FARE FAMILY:FC1:1-2:CLASSIC"] },
                              { freeTextQualification: [{ textSubjectQualifier: ["1"], informationType: ["1A0"] }], freeText: ["FARE FAMILY:FC2:3-4:CLASSIC"] },
                              { freeTextQualification: [{ textSubjectQualifier: ["1"], informationType: ["1A0"] }], freeText: ["TICKET STOCK RESTRICTION"] },
                              { freeTextQualification: [{ textSubjectQualifier: ["1"], informationType: ["1A0"] }], freeText: ["BG CXR: 2*OS/2*LX"] },
                              { freeTextQualification: [{ textSubjectQualifier: ["1"], informationType: ["1A0"] }], freeText: ["PRICED WITH VALIDATING CARRIER LH - REPRICE IF DIFFERENT VC"] }
                            ],
                            offerReferences: [{ offerIdentifier: [{ uniqueOfferReference: ["SP2P-2369376241727550445-1-OI1-AI1"] }] }],
                            surchargesGroup: [
                              {
                                taxesAmount: [
                                  {
                                    taxDetails: [
                                      { rate: ["797200"], countryCode: ["YQ"], type: ["AD"] },
                                      { rate: ["22400"], countryCode: ["FR"], type: ["SE"] },
                                      { rate: ["56700"], countryCode: ["FR"], type: ["TI"] },
                                      { rate: ["5100"], countryCode: ["IZ"], type: ["EB"] },
                                      { rate: ["6700"], countryCode: ["O4"], type: ["VC"] },
                                      { rate: ["58200"], countryCode: ["QX"], type: ["AP"] },
                                      { rate: ["45600"], countryCode: ["AT"], type: ["SE"] },
                                      { rate: ["57400"], countryCode: ["ZY"], type: ["AE"] },
                                      { rate: ["68300"], countryCode: ["GB"], type: ["AD"] },
                                      { rate: ["165800"], countryCode: ["UB"], type: ["AS"] },
                                      { rate: ["73500"], countryCode: ["CH"], type: ["AE"] }
                                    ]
                                  }
                                ]
                              }
                            ],
                            "segmentLevelGroup": [
                              {
                                "segmentInformation": [
                                  {
                                    "flightDate": [{ "departureDate": ["260624"] }],
                                    "boardPointDetails": [{ "trueLocationId": ["CDG"] }],
                                    "offpointDetails": [{ "trueLocationId": ["VIE"] }],
                                    "companyDetails": [{ "marketingCompany": ["OS"] }],
                                    "flightIdentification": [{ "flightNumber": ["410"], "bookingClass": ["M"], "operationalSuffix": ["X"] }],
                                    "flightTypeDetails": [{ "flightIndicator": ["T"] }],
                                    "itemNumber": ["1"]
                                  }
                                ],
                                "additionalInformation": [{ "productDateTimeDetails": [{ "departureDate": ["260624"], "arrivalDate": ["260624"] }] }],
                                "fareBasis": [{ "additionalFareDetails": [{ "rateClass": ["METCLSE0"], "secondRateClass": ["M"] }] }],
                                "cabinGroup": [{ "cabinSegment": [{ "bookingClassDetails": [{ "designator": ["M"], "option": ["M"] }] }] }],
                                "baggageAllowance": [{ "baggageDetails": [{ "freeAllowance": ["1"], "quantityCode": ["N"] }] }],
                                "ptcSegment": [{ "quantityDetails": [{ "numberOfUnit": ["1"], "unitQualifier": ["ADT"] }] }],
                                "flightProductInformationType": [{ "cabinProduct": [{ "rbd": ["M"], "cabin": ["M"], "avlStatus": ["9"] }] }]
                              },
                              {
                                "segmentInformation": [
                                  {
                                    "flightDate": [{ "departureDate": ["260624"] }],
                                    "boardPointDetails": [{ "trueLocationId": ["VIE"] }],
                                    "offpointDetails": [{ "trueLocationId": ["LHR"] }],
                                    "companyDetails": [{ "marketingCompany": ["OS"] }],
                                    "flightIdentification": [{ "flightNumber": ["457"], "bookingClass": ["M"], "operationalSuffix": ["X"] }],
                                    "itemNumber": ["2"]
                                  }
                                ],
                                "additionalInformation": [{ "productDateTimeDetails": [{ "departureDate": ["260624"], "arrivalDate": ["260624"] }] }],
                                "fareBasis": [{ "additionalFareDetails": [{ "rateClass": ["METCLSE0"], "secondRateClass": ["M"] }] }],
                                "cabinGroup": [{ "cabinSegment": [{ "bookingClassDetails": [{ "designator": ["M"], "option": ["M"] }] }] }],
                                "baggageAllowance": [{ "baggageDetails": [{ "freeAllowance": ["1"], "quantityCode": ["N"] }] }],
                                "ptcSegment": [{ "quantityDetails": [{ "numberOfUnit": ["1"], "unitQualifier": ["ADT"] }] }],
                                "flightProductInformationType": [{ "cabinProduct": [{ "rbd": ["M"], "cabin": ["M"], "avlStatus": ["9"] }] }]
                              },
                              {
                                "segmentInformation": [
                                  {
                                    "flightDate": [{ "departureDate": ["290624"] }],
                                    "boardPointDetails": [{ "trueLocationId": ["LCY"] }],
                                    "offpointDetails": [{ "trueLocationId": ["ZRH"] }],
                                    "companyDetails": [{ "marketingCompany": ["LX"] }],
                                    "flightIdentification": [{ "flightNumber": ["457"], "bookingClass": ["M"], "operationalSuffix": ["X"] }],
                                    "flightTypeDetails": [{ "flightIndicator": ["T"] }],
                                    "itemNumber": ["3"]
                                  }
                                ],
                                "additionalInformation": [
                                  {
                                    "productDateTimeDetails": [
                                      {
                                        "departureDate": [
                                          "290624"
                                        ],
                                        "arrivalDate": [
                                          "290624"
                                        ]
                                      }
                                    ]
                                  }
                                ],
                                "fareBasis": [
                                  {
                                    "additionalFareDetails": [
                                      {
                                        "rateClass": [
                                          "METCLSE0"
                                        ],
                                        "secondRateClass": [
                                          "M"
                                        ]
                                      }
                                    ]
                                  }
                                ],
                                "cabinGroup": [
                                  {
                                    "cabinSegment": [
                                      {
                                        "bookingClassDetails": [
                                          {
                                            "designator": [
                                              "M"
                                            ],
                                            "option": [
                                              "M"
                                            ]
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ],
                                "baggageAllowance": [
                                  {
                                    "baggageDetails": [
                                      {
                                        "freeAllowance": [
                                          "1"
                                        ],
                                        "quantityCode": [
                                          "N"
                                        ]
                                      }
                                    ]
                                  }
                                ],
                                "ptcSegment": [
                                  {
                                    "quantityDetails": [
                                      {
                                        "numberOfUnit": [
                                          "1"
                                        ],
                                        "unitQualifier": [
                                          "ADT"
                                        ]
                                      }
                                    ]
                                  }
                                ],
                                "flightProductInformationType": [
                                  {
                                    "cabinProduct": [
                                      {
                                        "rbd": [
                                          "M"
                                        ],
                                        "cabin": [
                                          "M"
                                        ],
                                        "avlStatus": [
                                          "9"
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              },
                              {
                                "segmentInformation": [
                                  {
                                    "flightDate": [
                                      {
                                        "departureDate": [
                                          "290624"
                                        ]
                                      }
                                    ],
                                    "boardPointDetails": [
                                      {
                                        "trueLocationId": [
                                          "ZRH"
                                        ]
                                      }
                                    ],
                                    "offpointDetails": [
                                      {
                                        "trueLocationId": [
                                          "CDG"
                                        ]
                                      }
                                    ],
                                    "companyDetails": [
                                      {
                                        "marketingCompany": [
                                          "LX"
                                        ]
                                      }
                                    ],
                                    "flightIdentification": [
                                      {
                                        "flightNumber": [
                                          "644"
                                        ],
                                        "bookingClass": [
                                          "M"
                                        ],
                                        "operationalSuffix": [
                                          "X"
                                        ]
                                      }
                                    ],
                                    "itemNumber": [
                                      "4"
                                    ]
                                  }
                                ],
                                "additionalInformation": [
                                  {
                                    "productDateTimeDetails": [
                                      {
                                        "departureDate": [
                                          "290624"
                                        ],
                                        "arrivalDate": [
                                          "290624"
                                        ]
                                      }
                                    ]
                                  }
                                ],
                                "fareBasis": [
                                  {
                                    "additionalFareDetails": [
                                      {
                                        "rateClass": [
                                          "METCLSE0"
                                        ],
                                        "secondRateClass": [
                                          "M"
                                        ]
                                      }
                                    ]
                                  }
                                ],
                                "cabinGroup": [
                                  {
                                    "cabinSegment": [
                                      {
                                        "bookingClassDetails": [
                                          {
                                            "designator": [
                                              "M"
                                            ],
                                            "option": [
                                              "M"
                                            ]
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ],
                                "baggageAllowance": [
                                  {
                                    "baggageDetails": [
                                      {
                                        "freeAllowance": [
                                          "1"
                                        ],
                                        "quantityCode": [
                                          "N"
                                        ]
                                      }
                                    ]
                                  }
                                ],
                                "ptcSegment": [
                                  {
                                    "quantityDetails": [
                                      {
                                        "numberOfUnit": [
                                          "1"
                                        ],
                                        "unitQualifier": [
                                          "ADT"
                                        ]
                                      }
                                    ]
                                  }
                                ],
                                "flightProductInformationType": [
                                  {
                                    "cabinProduct": [
                                      {
                                        "rbd": [
                                          "M"
                                        ],
                                        "cabin": [
                                          "M"
                                        ],
                                        "avlStatus": [
                                          "9"
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ],
                            "fareComponentDetailsGroup": [
                              {
                                "fareComponentID": [
                                  {
                                    "itemNumberDetails": [
                                      {
                                        "number": [
                                          "1"
                                        ],
                                        "type": [
                                          "FC"
                                        ]
                                      }
                                    ]
                                  }
                                ],
                                "marketFareComponent": [
                                  {
                                    "boardPointDetails": [
                                      {
                                        "trueLocationId": [
                                          "PAR"
                                        ]
                                      }
                                    ],
                                    "offpointDetails": [
                                      {
                                        "trueLocationId": [
                                          "LON"
                                        ]
                                      }
                                    ]
                                  }
                                ],
                                "monetaryInformation": [
                                  {
                                    "monetaryDetails": [
                                      {
                                        "typeQualifier": [
                                          "TFC"
                                        ],
                                        "amount": [
                                          "278.12"
                                        ],
                                        "currency": [
                                          "NUC"
                                        ]
                                      }
                                    ]
                                  }
                                ],
                                "componentClassInfo": [
                                  {
                                    "fareBasisDetails": [
                                      {
                                        "rateTariffClass": [
                                          "METCLSE0"
                                        ]
                                      }
                                    ]
                                  }
                                ],
                                "fareQualifiersDetail": [
                                  {
                                    "discountDetails": [
                                      {
                                        "fareQualifier": [
                                          "763"
                                        ]
                                      }
                                    ]
                                  }
                                ],
                                "fareFamilyDetails": [
                                  {
                                    "fareFamilyname": [
                                      "CLASSIC"
                                    ]
                                  }
                                ],
                                "fareFamilyOwner": [
                                  {
                                    "companyIdentification": [
                                      {
                                        "otherCompany": [
                                          "OS"
                                        ]
                                      }
                                    ]
                                  }
                                ],
                                "couponDetailsGroup": [
                                  {
                                    "productId": [
                                      {
                                        "referenceDetails": [
                                          {
                                            "type": [
                                              "ST"
                                            ],
                                            "value": [
                                              "1"
                                            ]
                                          }
                                        ]
                                      }
                                    ]
                                  },
                                  {
                                    "productId": [
                                      {
                                        "referenceDetails": [
                                          {
                                            "type": [
                                              "ST"
                                            ],
                                            "value": [
                                              "2"
                                            ]
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              },
                              {
                                "fareComponentID": [
                                  {
                                    "itemNumberDetails": [
                                      {
                                        "number": [
                                          "2"
                                        ],
                                        "type": [
                                          "FC"
                                        ]
                                      }
                                    ]
                                  }
                                ],
                                "marketFareComponent": [
                                  {
                                    "boardPointDetails": [
                                      {
                                        "trueLocationId": [
                                          "LON"
                                        ]
                                      }
                                    ],
                                    "offpointDetails": [
                                      {
                                        "trueLocationId": [
                                          "PAR"
                                        ]
                                      }
                                    ]
                                  }
                                ],
                                "monetaryInformation": [
                                  {
                                    "monetaryDetails": [
                                      {
                                        "typeQualifier": [
                                          "TFC"
                                        ],
                                        "amount": [
                                          "285.66"
                                        ],
                                        "currency": [
                                          "NUC"
                                        ]
                                      }
                                    ]
                                  }
                                ],
                                "componentClassInfo": [
                                  {
                                    "fareBasisDetails": [
                                      {
                                        "rateTariffClass": [
                                          "METCLSE0"
                                        ]
                                      }
                                    ]
                                  }
                                ],
                                "fareQualifiersDetail": [
                                  {
                                    "discountDetails": [
                                      {
                                        "fareQualifier": [
                                          "763"
                                        ]
                                      }
                                    ]
                                  }
                                ],
                                "fareFamilyDetails": [
                                  {
                                    "fareFamilyname": [
                                      "CLASSIC"
                                    ]
                                  }
                                ],
                                "fareFamilyOwner": [
                                  {
                                    "companyIdentification": [
                                      {
                                        "otherCompany": [
                                          "LX"
                                        ]
                                      }
                                    ]
                                  }
                                ],
                                "couponDetailsGroup": [
                                  {
                                    "productId": [
                                      {
                                        "referenceDetails": [
                                          {
                                            "type": [
                                              "ST"
                                            ],
                                            "value": [
                                              "3"
                                            ]
                                          }
                                        ]
                                      }
                                    ]
                                  },
                                  {
                                    "productId": [
                                      {
                                        "referenceDetails": [
                                          {
                                            "type": [
                                              "ST"
                                            ],
                                            "value": [
                                              "4"
                                            ]
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    }
  }
}

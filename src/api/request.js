import axios from 'axios'

export const getEquipment = () => equipment

export const getCustomers = () => customers

export const getEquipmentTypes = () => equipmentTypes

function testApiRequest(apiUrl) {
  const url = `https://my.api.mockaroo.com/${apiUrl}`

  return axios
    .get(url, {
      headers: {
        'x-api-key': '4db08440',
      },
    })
    .then(response => response.data)
}

const equipmentTypes = ['Gadget', 'Widget', 'Thingamajig']

const customers = ['Scott Calvin', 'Mike Baxter', 'Tim Taylor']

const equipment = [
  {
    id: 1,
    barcodeId: '163104252-1',
    name: 'Face to face logistical matrix',
    description: 'Curabitur gravida nisi at nibh.',
    type: 'Thingamajig',
    customer: 'Scott Calvin',
    contact: 'Scott Calvin',
    jobCount: 3,
    manufacturer: 'Langworth-Johnston',
    model: 'Crossfire Roadster',
    serial: 517397,
    installDate: '1006722799',
    lastServiceDate: '1536050622',
    nextServiceDue: '1573950473',
  },
  {
    id: 2,
    barcodeId: '777751972-7',
    name: 'Universal radical array',
    description:
      'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim.',
    type: 'Widget',
    customer: 'Mike Baxter',
    contact: 'Scott Calvin',
    jobCount: 62,
    manufacturer: 'Von, Mayert and Lubowitz',
    model: 'Countryman',
    serial: 432480,
    installDate: '1249706152',
    lastServiceDate: '1512787488',
    nextServiceDue: '1566169528',
  },
  {
    id: 3,
    barcodeId: '452672574-9',
    name: 'Total directional leverage',
    description: 'In congue. Etiam justo.',
    type: 'Gadget',
    customer: 'Scott Calvin',
    contact: 'Tim Taylor',
    jobCount: 76,
    manufacturer: 'Mueller-Leannon',
    model: 'Focus',
    serial: 413923,
    installDate: '1111115639',
    lastServiceDate: '1533431458',
    nextServiceDue: '1572218703',
  },
  {
    id: 4,
    barcodeId: '533724630-5',
    name: 'Fundamental cohesive firmware',
    description:
      'In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin interdum mauris non ligula pellentesque ultrices.',
    type: 'Gadget',
    customer: 'Scott Calvin',
    contact: 'Scott Calvin',
    jobCount: 78,
    manufacturer: 'Kulas-Casper',
    model: 'Stealth',
    serial: 997268,
    installDate: '1072791875',
    lastServiceDate: '1527690721',
    nextServiceDue: '1572900976',
  },
  {
    id: 5,
    barcodeId: '556170621-7',
    name: 'Persevering user-facing middleware',
    description: 'Suspendisse potenti.',
    type: 'Widget',
    customer: 'Tim Taylor',
    contact: 'Scott Calvin',
    jobCount: 16,
    manufacturer: 'Lesch, Greenfelder and Dooley',
    model: 'Silverado 1500',
    serial: 917187,
    installDate: '1264138024',
    lastServiceDate: '1533042713',
    nextServiceDue: '1551507878',
  },
  {
    id: 6,
    barcodeId: '440634290-7',
    name: 'Future-proofed zero administration database',
    description:
      'Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla.',
    type: 'Widget',
    customer: 'Mike Baxter',
    contact: 'Scott Calvin',
    jobCount: 87,
    manufacturer: 'Glover-Breitenberg',
    model: 'Tacoma',
    serial: 421243,
    installDate: '1123602145',
    lastServiceDate: '1520489078',
    nextServiceDue: '1551844149',
  },
  {
    id: 7,
    barcodeId: '369204239-6',
    name: 'Extended dynamic Graphic Interface',
    description:
      'Duis at velit eu est congue elementum. In hac habitasse platea dictumst.',
    type: 'Widget',
    customer: 'Scott Calvin',
    contact: 'Tim Taylor',
    jobCount: 48,
    manufacturer: 'Beer and Sons',
    model: 'X-Type',
    serial: 512266,
    installDate: '1253961785',
    lastServiceDate: '1533006956',
    nextServiceDue: '1560482302',
  },
  {
    id: 8,
    barcodeId: '415145484-5',
    name: 'De-engineered exuding focus group',
    description:
      'Praesent lectus. Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio.',
    type: 'Gadget',
    customer: 'Tim Taylor',
    contact: 'Mike Baxter',
    jobCount: 24,
    manufacturer: "O'Keefe, Satterfield and Leuschke",
    model: 'Suburban 1500',
    serial: 141145,
    installDate: '1076171820',
    lastServiceDate: '1542582838',
    nextServiceDue: '1552043970',
  },
  {
    id: 9,
    barcodeId: '027638365-6',
    name: 'Synergistic mission-critical intranet',
    description: 'Duis aliquam convallis nunc.',
    type: 'Thingamajig',
    customer: 'Mike Baxter',
    contact: 'Scott Calvin',
    jobCount: 74,
    manufacturer: 'Hammes LLC',
    model: '599 GTB Fiorano',
    serial: 580473,
    installDate: '1035219329',
    lastServiceDate: '1536168586',
    nextServiceDue: '1558864034',
  },
  {
    id: 10,
    barcodeId: '151922042-1',
    name: 'Proactive zero tolerance hierarchy',
    description: 'Etiam pretium iaculis justo.',
    type: 'Gadget',
    customer: 'Tim Taylor',
    contact: 'Scott Calvin',
    jobCount: 29,
    manufacturer: 'Bernier LLC',
    model: 'F150',
    serial: 914902,
    installDate: '1313662732',
    lastServiceDate: '1526026374',
    nextServiceDue: '1559025020',
  },
]

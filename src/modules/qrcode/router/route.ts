// src/modules/qrcode/router/route.ts
import QRPage from '../pages/Index.vue';

const itemRoutes = [
  {
    path: '/qr-generator',
    name: 'QRPage',
    component: QRPage,
  }
];

export default itemRoutes;

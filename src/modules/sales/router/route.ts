// src/modules/qrcode/router/route.ts
import SalesPage from '../pages/Index.vue';
import UploadPage from '../pages/Upload.vue';

const salesRoutes = [
  {
    path: '/sales-order',
    name: 'SalesPage',
    component: SalesPage,
  },
  {
    path: '/csv-upload',
    name: 'UploadPage',
    component: UploadPage,
  }
];

export default salesRoutes;

import api from "@/lib/api";

const MOCK_PLACE_IMAGES: string[] = [
  "https://lh5.googleusercontent.com/p/AF1QipMbMamq64_3toOR64KkISt7InjdZwh0bSSiFRH8",
  "https://lh5.googleusercontent.com/p/AF1QipOFgUK8NQtqbuS3BM-rE3dIIQ8EVMmazYEzy2Kl",
  "https://lh5.googleusercontent.com/p/AF1QipMxF4kL4_pTqqIh3ISqOttjiLrNhH5CLsXsJF2Q",
  "https://lh5.googleusercontent.com/p/AF1QipMAneeK5-gaeNERqFc_VNjISsV51DjrKpisyqVd",
  "https://lh5.googleusercontent.com/p/AF1QipNKMpnvSKpthgOdNdx583YTI-vGsqusa7X4NJv2",
  "https://lh5.googleusercontent.com/p/AF1QipNUquDOCU3fexXQZRDV-qrqAcMU6gPUdzLkg-R9",
  "https://lh5.googleusercontent.com/p/AF1QipNcesSfwVahSZrpb5h0JfsZLsz_Tn2m5VAhUbMd",
  "https://lh5.googleusercontent.com/p/AF1QipM8kr45frzEjQF7G5yx-Qkhfa4Zjf-iIEapDuWV",
  "https://lh5.googleusercontent.com/p/AF1QipNYQr_1KFly_KfpClWtGIJ8xI4N6X9nzMyqjh-C",
  "https://lh5.googleusercontent.com/p/AF1QipOqIkbPxp1HpApLagrCrnRd6PRxHkmGJyCOnJDy",
  "https://lh5.googleusercontent.com/p/AF1QipOG_MPNAiq_HmHCdi9-2Qm2-LyD5y9crdGVkUgd",
  "https://lh5.googleusercontent.com/p/AF1QipPRTGIA7yPQyvlDT6NeUyyMgjqhKV7rvaLtmCM5",
  "https://lh5.googleusercontent.com/p/AF1QipMgXQ1bAEB_H6JcWkXbK-xSkq4FlVh5PqJ8o2ug",
  "https://lh5.googleusercontent.com/p/AF1QipPJJFS9_BjkiUw4CQ110Uf-BWcnnho3eYNUUy9R",
];

export const getMockPlaceImages = async (id: string) => {
  return new Promise<string[]>((resolve) => {
    setTimeout(() => {
      resolve(MOCK_PLACE_IMAGES);
    }, 500);
  });
};

export const getPlaceImages = async (id: string) => {
  const response = await api.get<string[]>(`/v1/places/${id}/images`);
  return response.data;
};

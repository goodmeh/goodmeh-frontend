import api from "@/lib/api";

const MOCK_PLACE_IMAGES: GetPlaceImagesResponse[] = [
  {
    image_urls: [
      "https://lh5.googleusercontent.com/p/AF1QipMXQc9wTQbHSfHB1bcEnJ1R0lMZAe_vshkxL91r",
      "https://lh5.googleusercontent.com/p/AF1QipOrBm0Teip7iKHFpNFF91uY-uQKP9_U5xmQAayP",
      "https://lh5.googleusercontent.com/p/AF1QipPhJuAmlsYeBFyAxaveWrYPjDMYwSE8ecJPBpB7",
    ],
    review_date: "2024-09-23T09:57:16.457910+00:00",
  },
  {
    image_urls: [
      "https://lh5.googleusercontent.com/p/AF1QipM80XZQ2seA_jSbs_lBXtCs0XRosD0ThCsLSwfR",
      "https://lh5.googleusercontent.com/p/AF1QipO8S6dnqOoi8vp-3VFbjTwA5w1RQ-7IhuvL_HES",
    ],
    review_date: "2024-09-23T08:14:19.118150+00:00",
  },
  {
    image_urls: [
      "https://lh5.googleusercontent.com/p/AF1QipMxD7WYekneEd68LEzR_owUcFDAjm52aWnSuFTy",
    ],
    review_date: "2024-09-22T12:08:11.092070+00:00",
  },
  {
    image_urls: [
      "https://lh5.googleusercontent.com/p/AF1QipMAneeK5-gaeNERqFc_VNjISsV51DjrKpisyqVd",
      "https://lh5.googleusercontent.com/p/AF1QipNKMpnvSKpthgOdNdx583YTI-vGsqusa7X4NJv2",
      "https://lh5.googleusercontent.com/p/AF1QipNUquDOCU3fexXQZRDV-qrqAcMU6gPUdzLkg-R9",
      "https://lh5.googleusercontent.com/p/AF1QipNcesSfwVahSZrpb5h0JfsZLsz_Tn2m5VAhUbMd",
    ],
    review_date: "2024-09-21T18:08:19.327166+00:00",
  },
  {
    image_urls: [
      "https://lh5.googleusercontent.com/p/AF1QipM8kr45frzEjQF7G5yx-Qkhfa4Zjf-iIEapDuWV",
      "https://lh5.googleusercontent.com/p/AF1QipNYQr_1KFly_KfpClWtGIJ8xI4N6X9nzMyqjh-C",
      "https://lh5.googleusercontent.com/p/AF1QipOqIkbPxp1HpApLagrCrnRd6PRxHkmGJyCOnJDy",
    ],
    review_date: "2024-09-21T13:20:07.839028+00:00",
  },
  {
    image_urls: [
      "https://lh5.googleusercontent.com/p/AF1QipOG_MPNAiq_HmHCdi9-2Qm2-LyD5y9crdGVkUgd",
      "https://lh5.googleusercontent.com/p/AF1QipPRTGIA7yPQyvlDT6NeUyyMgjqhKV7rvaLtmCM5",
    ],
    review_date: "2024-09-20T11:34:32.033562+00:00",
  },
  {
    image_urls: [
      "https://lh5.googleusercontent.com/p/AF1QipMbMamq64_3toOR64KkISt7InjdZwh0bSSiFRH8",
      "https://lh5.googleusercontent.com/p/AF1QipOFgUK8NQtqbuS3BM-rE3dIIQ8EVMmazYEzy2Kl",
    ],
    review_date: "2024-09-19T00:08:21.314279+00:00",
  },
  {
    image_urls: [
      "https://lh5.googleusercontent.com/p/AF1QipPJJFS9_BjkiUw4CQ110Uf-BWcnnho3eYNUUy9R",
    ],
    review_date: "2024-09-17T13:40:57.287388+00:00",
  },
  {
    image_urls: [
      "https://lh5.googleusercontent.com/p/AF1QipMxF4kL4_pTqqIh3ISqOttjiLrNhH5CLsXsJF2Q",
    ],
    review_date: "2024-09-17T13:38:36.896171+00:00",
  },
  {
    image_urls: [
      "https://lh5.googleusercontent.com/p/AF1QipMgXQ1bAEB_H6JcWkXbK-xSkq4FlVh5PqJ8o2ug",
    ],
    review_date: "2024-09-16T13:01:50.970477+00:00",
  },
];

export const getMockPlaceImages = async (id: string) => {
  return new Promise<GetPlaceImagesResponse[]>((resolve) => {
    setTimeout(() => {
      resolve(MOCK_PLACE_IMAGES);
    }, 500);
  });
};

export type GetPlaceImagesResponse = {
  image_urls: string[];
  review_date: string;
};

export const getPlaceImages = async (id: string) => {
  const response = await api.get<GetPlaceImagesResponse[]>(
    `/v1/places/${id}/images`,
  );
  return response.data;
};

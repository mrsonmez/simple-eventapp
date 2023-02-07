export interface itemTypes {
  id: string;
  title: string;
  desc: string;
  date: string;
  from: string;
  to: string;
  location: [
    {
      name: string;
      desc: string;
      lat: number;
      lng: number;
    }
  ];
}

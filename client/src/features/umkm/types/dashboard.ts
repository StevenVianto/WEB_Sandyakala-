export type TabsType = "rekrutmen" | "project" | "shift";

export type StatCardDataType = {
  title: string;
  value: number | string;
  colorClass: string;
};

export type StatCard = {
  rekrutmen: StatCardDataType[];
  project: StatCardDataType[];
  shift: StatCardDataType[];
};

export type TabsData = {
  key: TabsType;
  label: string;
};

export type JobStatus = "Buka" | "Segera Tutup" | "Tutup";

export type JobOpening = {
  id: number;
  title: string;
  type: string;
  status: JobStatus;
  date: string;
  iconStr: string;
  iconBgClass: string;
  applicantImages: string[];
  extraApplicants: number;
};

export interface AppGenerator {
  name: string;
  generate(): Promise<void>;
}

type EnvVariable = {
  name: string;
  value?: string;
  desciption?: string;
};

export type TemplateConfig = {
  title: string;
  name: string;
  description: string;
  folderPath: string;
  env?: {
    fileName: string;
    variables: Record<'api', EnvVariable> & Record<string, EnvVariable>;
  };
  repoUrl: string;
};

export type KeyValuePairs = {
  [key: string]: string;
};

type ConnectLink = {
  label: string;
  path: string;
};

type FooterConnectProps = {
  connect: string;
  connectLinks: ConnectLink[];
};

type FooterCopyrightProps = {
  copyright: string;
};

type FooterDescriptionProps = {
  appName: string;
  description: string;
};

type InfoLink = {
  label: string;
  path: string;
};

type FooterInformationProps = {
  information: string;
  infoLinks: InfoLink[];
};

type FooterProps = {
  appName: string;
  description: string;
  information: string;
  infoLinks: InfoLink[];
  connect: string;
  connectLinks: ConnectLink[];
  copyright: string;
};

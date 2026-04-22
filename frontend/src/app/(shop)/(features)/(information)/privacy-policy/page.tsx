import PrivacyArchivalImage from './partials/privacy-archival-image';
import PrivacyArchivalRights from './partials/privacy-archival-rights';
import PrivacyDataCollection from './partials/privacy-data-collection';
import PrivacyIntroduction from './partials/privacy-introduction';
import PrivacyPolicyHeader from './partials/privacy-policy-header';
import PrivacySecurityStorage from './partials/privacy-security-storage';

type PrivacyPolicyProps = {};

export default function PrivacyPolicy({}: PrivacyPolicyProps) {
  return (
    <div className="bg-[#f7faf5] py-12 text-justify">
      <div className="max-w-4xl mx-auto px-6">
        <PrivacyPolicyHeader />

        <PrivacyIntroduction />

        <PrivacyDataCollection />

        <PrivacyArchivalRights />

        <PrivacySecurityStorage />

        <PrivacyArchivalImage alt="Archival" />
      </div>
    </div>
  );
}

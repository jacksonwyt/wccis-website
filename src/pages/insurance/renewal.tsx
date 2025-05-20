import RenewalForm from '@/components/RenewalForm';
import Layout from '@/components/layout/Layout';

const RenewalPage = () => {
  return (
    <Layout title="Insurance Renewal Update Form">
      <div className="container mx-auto px-4 py-12 md:py-20 max-w-4xl">
        <RenewalForm />
      </div>
    </Layout>
  );
};

export default RenewalPage; 
import WorkersCompRenewalForm from '@/components/WorkersCompRenewalForm';
import Layout from '@/components/layout/Layout';

const WorkersCompRenewalPage = () => {
  return (
    <Layout title="Workers Compensation Renewal Form">
      <div className="container mx-auto px-4 py-12 md:py-20 max-w-4xl">
        <WorkersCompRenewalForm />
      </div>
    </Layout>
  );
};

export default WorkersCompRenewalPage; 
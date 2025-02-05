import React, { useEffect } from 'react';

import Navbar from '../layout/Navbar'
import Footer from '../layout/Footer';


function About() {


  useEffect(() => {

  }, []);

  return (
    <>
      <Navbar search={false} />
      <div className='py-[40px] px-[60px]'>
        <div className='text-[35px] md-[10px] text-center'>Advertiser Disclosure</div>
        <div className='text-[20px] mt-[10px]'>This website may contain affiliate links to products or services offered by Amazon.com or its affiliated companies. These affiliate links are provided for the convenience of our users and visitors, and we may earn a commission from qualifying purchases made through these links.
</div>
        <div className='text-[20px] mt-[10px]'>As an Amazon Associate, we may earn from qualifying purchases. This means that when you click on an affiliate link on this website and make a purchase, we may receive a commission at no additional cost to you.</div>
        <div className='text-[20px] mt-[10px]'>We strive to be transparent and honest with our readers and viewers, and we want you to be fully informed about any potential financial relationships we may have with the products or services mentioned on this website. Please note that the inclusion of affiliate links does not influence our editorial content or product recommendations.
</div>
        <div className='text-[20px] mt-[10px]'>It is important to understand that we only recommend products or services that we genuinely believe will be of value to our audience. Our recommendations are based on our own research, expertise, and the trust we have in the quality and reputation of the products or services being promoted.</div>
        <div className='text-[20px] mt-[10px]'>By using this website and clicking on affiliate links, you acknowledge and understand that we may earn a commission from your purchases. This compensation helps us maintain and improve the website's content and continue providing valuable information to our users.</div>
        <div className='text-[20px] mt-[10px]'>We appreciate your support and trust in our recommendations. If you have any questions or concerns regarding our advertiser disclosure or the use of affiliate links on this website, please feel free to contact us.</div>
        <div className='text-[20px] mt-[40px]'>Note: It is important to consult the specific terms and conditions provided by Amazon.com or its affiliated companies for detailed information about their affiliate programs and how they may affect your purchases.</div>
      </div>
      <div className='grid grid-cols-4 mb-[50px]'>
        <div className='flex justify-center'><img alt="Amazon" className="w-[60%]" src="/assets/Amazon.svg" /></div>
        <div className='flex justify-center'><img alt="BestBuy" className="w-[60%]" src="/assets/BestBuy.svg" /></div>
        <div className='flex justify-center'><img alt="Walmart" className="w-[60%]" src="/assets/Walmart.svg" /></div>
        <div className='flex justify-center'><img alt="Woot" className="w-[60%]" src="/assets/Woot.svg" /></div>
      </div>
      <Footer />
    </>
  );
}

export default About;

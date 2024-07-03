import { TextGenerateEffect } from "./ui/TextGenerateEffect";



const Hero = () => {

    return (
        <section
            className='w-full flex xl:flex-row flex-col justify-center min-h-screen gap-10 container'
        >
            <div className='relative xl:w-2/5 flex flex-col justify-center items-start w-full  max-xl:padding-x'>
                <p className='text-xl font-montserrat text-coral-red'>
                    Our Summer collections
                </p>

                <TextGenerateEffect
                    words="Shorten it /n Profit from it"
                    className='mt-10 font-palanquin text-8xl max-sm:text-[72px] max-sm:leading-[82px] font-bold' />

              
                <p className='font-montserrat text-slate-gray text-lg leading-8 mt-6 mb-14 sm:max-w-sm'>
                    Discover stylish Nike arrivals, quality comfort, and innovation for
                    your active life.
                </p>


                <div className='flex justify-start items-start flex-wrap w-full mt-20 gap-16'>

                </div>
            </div>

            <div className='relative flex-1 flex justify-center items-center xl:min-h-screen max-xl:py-40 bg-primary bg-hero bg-cover bg-center'>


                <div className='flex sm:gap-6 gap-4 absolute -bottom-[5%] sm:left-[10%] max-sm:px-6'>

                </div>
            </div>
        </section>
    );
};

export default Hero;

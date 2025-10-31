import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function Testimonials() {
  const testimonials = [
    {
      text: "Schedulr has completely changed the way I manage my tasks. The clean UI makes it a joy to use!",
      name: "Priya S.",
    },
    {
      text: "I love how simple yet powerful this tool is. My productivity has skyrocketed!",
      name: "Arjun M.",
    },
    {
      text: "The calendar view helps me stay on track every single day. Highly recommend Schedulr!",
      name: "Riya K.",
    },
    {
      text: "It feels like I finally have control over my schedule. Great tool for students and professionals!",
      name: "Kabir L.",
    },
  ];

   return (
    <section className="bg-white dark:bg-gray-900 py-16 mt-16 rounded-2xl shadow-md">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-12">What Our Users Say</h2>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop={true}
          className="pb-16"
        >
          {testimonials.map((t, index) => (
            <SwiperSlide key={index}>
              <div className="max-w-xl mx-auto p-6 bg-indigo-50 dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition min-h-[10rem] flex flex-col justify-center">
                <p className="text-gray-700 dark:text-gray-300 italic mb-4">"{t.text}"</p>
                <h4 className="font-semibold text-teal-600 dark:text-teal-400">- {t.name}</h4>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}


import { motion } from 'framer-motion';
import { useCMS } from '../context/CMSContext';
import { useLanguage } from '../context/LanguageContext';
import { Clock, MapPin } from 'lucide-react';

const UpcomingEvents = () => {
    const { state } = useCMS();
    const { t } = useLanguage();
    const events = state.events;

    return (
        <section id="events" className="py-20 bg-white relative">
            <div className="container mx-auto px-4 md:px-6">
                <div className="mb-12 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 mb-4">
                        <span className="w-8 h-1 bg-brand-500 rounded-full" />
                        <span className="text-brand-600 font-bold uppercase tracking-wider text-sm">
                            {t.upcomingEvents.subtitle}
                        </span>
                    </div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold text-gray-900"
                    >
                        {t.upcomingEvents.title}
                    </motion.h2>
                </div>

                {events.length === 0 ? (
                    <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-gray-200">
                        <p className="text-gray-500 text-lg">{t.upcomingEvents.empty}</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {events.map((event, idx) => (
                            <motion.div
                                key={event.id}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="flex flex-col sm:flex-row bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
                            >
                                {/* Date Highlight */}
                                <div className="bg-brand-50 sm:w-32 flex flex-col justify-center items-center p-6 border-b sm:border-b-0 sm:border-r border-brand-100 shrink-0">
                                    <span className="text-brand-600 font-bold text-3xl">{event.date.split(' ')[0]}</span>
                                    <span className="text-brand-800 font-medium text-sm mt-1 uppercase">{event.date.split(' ')[1]}</span>
                                </div>

                                {/* Event Details */}
                                <div className="p-6 md:p-8 flex-1">
                                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-brand-600 transition-colors">
                                        {event.title}
                                    </h3>

                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Clock className="w-4 h-4 text-brand-500" />
                                            <span>{event.time}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <MapPin className="w-4 h-4 text-brand-500" />
                                            <span>{event.location}</span>
                                        </div>
                                    </div>

                                    <p className="text-gray-600 font-light leading-relaxed">
                                        {event.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default UpcomingEvents;

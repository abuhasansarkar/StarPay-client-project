"use client";

const Works = () => {
    return (
        <section className="w-full py-16 md:py-20 lg:py-28 bg-black overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Badge and Heading */}
                <div className="flex flex-col items-center text-center mb-12 md:mb-16">
                    <div className="inline-flex items-center px-5 py-2 rounded-full bg-[rgb(72,47,234)] text-white text-xs md:text-sm font-medium mb-6">
                        Getting started is simple.
                    </div>
                    <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4">
                        How it works
                    </h2>
                </div>

                {/* card */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Card 1 */}
                    <div className="p-6 border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300">
                        <h3 className="text-xl font-semibold mb-4">Sign Up</h3>
                        <p className="text-gray-600">
                            Create your account in just a few easy steps.
                        </p>
                    </div>
                    {/* Card 2 */}
                    <div className="p-6 border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300">
                        <h3 className="text-xl font-semibold mb-4">
                            Choose Your Plan
                        </h3>
                        <p className="text-gray-600">
                            Select the plan that best fits your needs.
                        </p>
                    </div>
                    {/* Card 3 */}
                    <div className="p-6 border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300">
                        <h3 className="text-xl font-semibold mb-4">
                            Set Up Your POS
                        </h3>
                        <p className="text-gray-600">
                            Easily configure your POS system to get started.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Works;

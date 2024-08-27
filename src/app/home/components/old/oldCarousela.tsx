{/* <section className="hero-section">
<AnimatePresence initial={false}>
    <motion.div
        key={currentSlide}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="hero-image-container"
        // style={{ scale }}
    >
        <CldImage
            src={carouselItems[currentSlide].image}
            fill
            style={{ objectFit: 'cover' }}
            alt={carouselItems[currentSlide].description}
            sizes="100vw"
        />
    </motion.div>
</AnimatePresence>
<div className="hero-overlay"></div>
<div className="hero-content">
    <motion.h1
        className="hero-title"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
    >
        {titleWords.map((word, index) => (
            <motion.span
                key={index}
                className="word"
                variants={wordVariants}
                style={{ display: 'inline-block', marginRight: '0.3em' }}
            >
                {word}
            </motion.span>
        ))}
    </motion.h1> */}


    
    {/* <motion.p
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="hero-description"
    >
        {carouselItems[currentSlide].description}
    </motion.p>
    <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="hero-button"
        onClick={() => {
            router.push('/neighborhoodInfo')
        }}
    >
        גלה עוד
    </motion.button> */}


{/* </div>
<button
    onClick={() => setCurrentSlide((prevSlide) => (prevSlide - 1 + carouselItems.length) % carouselItems.length)}
    className="carousel-control carousel-control-left"
>
    <FontAwesomeIcon icon={faChevronLeft} />
</button>
<button
    onClick={() => setCurrentSlide((prevSlide) => (prevSlide + 1) % carouselItems.length)}
    className="carousel-control carousel-control-right"
>
    <FontAwesomeIcon icon={faChevronRight} />
</button>
</section> */}
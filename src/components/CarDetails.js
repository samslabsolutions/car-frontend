"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, X, ChevronLeft, ChevronRight, Share, Heart, Volume2, VolumeX, Maximize } from 'lucide-react';

const FerrariMediaGallery = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
    const [isLiked, setIsLiked] = useState(false);

    // Video states
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isMuted, setIsMuted] = useState(true);
    const [isHovering, setIsHovering] = useState(false);
    const [volume, setVolume] = useState(1);
    const [showControls, setShowControls] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    const videoRef = useRef(null);
    const popupVideoRef = useRef(null);

    const mediaItems = [
        {
            type: 'video',
            src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            title: 'Ferrari Purosangue Video'
        },
        {
            type: 'image',
            src: 'https://static.oneclickdrive.com/uploads/cars/Land-Rover_Range-Rover-Velar_2021_33545_33545_2802248859-7_small.jpg?vee=3.6',
            title: 'Ferrari Steering Wheel'
        },
        {
            type: 'image',
            src: 'https://static.oneclickdrive.com/uploads/cars/Land-Rover_Range-Rover-Velar_2021_33545_33545_28021754364-1_small.jpg?vee=3.6',
            title: 'Ferrari Badge Detail'
        },
        {
            type: 'image',
            src: 'https://static.oneclickdrive.com/uploads/cars/Land-Rover_Range-Rover-Velar_2021_33545_33545_2802248859-7_small.jpg?vee=3.6',
            title: 'Ferrari Interior'
        },
        {
            type: 'image',
            src: 'https://static.oneclickdrive.com/uploads/cars/Land-Rover_Range-Rover-Velar_2021_33545_33545_28021754364-1_small.jpg?vee=3.6',
            title: 'Ferrari Exterior'
        }
    ];

    // Format time helper function
    const formatTime = (time) => {
        if (isNaN(time)) return '0:00';
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    // Video event handlers
    const handleVideoLoad = (video) => {
        if (video && !isNaN(video.duration)) {
            setDuration(video.duration);
            console.log('Video loaded, duration:', video.duration);
        }
    };

    const handleTimeUpdate = (video) => {
        if (video && !isNaN(video.currentTime)) {
            setCurrentTime(video.currentTime);
        }
    };

    const handleVideoPlay = () => {
        setIsPlaying(true);
    };

    const handleVideoPause = () => {
        setIsPlaying(false);
    };

    const handleVideoError = (e) => {
        console.error('Video error:', e);
        if (videoRef.current) {
            videoRef.current.src = 'https://www.w3schools.com/html/mov_bbb.mp4';
        }
    };

    const handleVideoLoadStart = () => {
        console.log('Video loading started');
    };

    const handleVideoCanPlay = () => {
        console.log('Video can play');
        const video = videoRef.current;
        if (video) {
            setDuration(video.duration || 0);
        }
    };

    const togglePlayPause = (e) => {
        e.stopPropagation();
        const video = videoRef.current;
        if (video) {
            if (video.paused) {
                const playPromise = video.play();
                if (playPromise !== undefined) {
                    playPromise
                        .then(() => {
                            setIsPlaying(true);
                        })
                        .catch(error => {
                            console.error('Error playing video:', error);
                            setIsPlaying(false);
                        });
                }
            } else {
                video.pause();
                setIsPlaying(false);
            }
        }
    };

    const toggleMute = (e) => {
        e.stopPropagation();
        const video = videoRef.current;
        if (video) {
            video.muted = !video.muted;
            setIsMuted(video.muted);
        }
    };

    const handleProgressClick = (e) => {
        e.stopPropagation();
        const video = videoRef.current;
        if (video && duration > 0) {
            const progressBar = e.currentTarget;
            const rect = progressBar.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const clickPercent = Math.max(0, Math.min(1, clickX / rect.width));
            const newTime = clickPercent * duration;

            video.currentTime = newTime;
            setCurrentTime(newTime);
        }
    };

    const handleVolumeChange = (e) => {
        e.stopPropagation();
        const newVolume = parseFloat(e.target.value);
        const video = videoRef.current;
        if (video) {
            video.volume = newVolume;
            setVolume(newVolume);
            setIsMuted(newVolume === 0);
            video.muted = newVolume === 0;
        }
    };

    const handleFullscreen = (e) => {
        e.stopPropagation();
        const video = videoRef.current;
        if (video) {
            if (video.requestFullscreen) {
                video.requestFullscreen();
            } else if (video.webkitRequestFullscreen) {
                video.webkitRequestFullscreen();
            } else if (video.msRequestFullscreen) {
                video.msRequestFullscreen();
            }
        }
    };

    const handleProgressMouseDown = (e) => {
        e.stopPropagation();
        setIsDragging(true);
        handleProgressClick(e);
    };

    const handleProgressMouseMove = (e) => {
        if (isDragging) {
            handleProgressClick(e);
        }
    };

    const handleProgressMouseUp = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        if (isDragging) {
            const handleMouseUp = () => setIsDragging(false);
            document.addEventListener('mouseup', handleMouseUp);
            return () => document.removeEventListener('mouseup', handleMouseUp);
        }
    }, [isDragging]);

    const openPopup = (index) => {
        setCurrentMediaIndex(index);
        setIsPopupOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closePopup = () => {
        setIsPopupOpen(false);
        document.body.style.overflow = 'unset';
        if (popupVideoRef.current) {
            popupVideoRef.current.pause();
        }
    };

    const nextMedia = () => {
        setCurrentMediaIndex((prev) => (prev + 1) % mediaItems.length);
    };

    const prevMedia = () => {
        setCurrentMediaIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length);
    };

    useEffect(() => {
        setIsPlaying(false);
        setCurrentTime(0);
        setDuration(0);
    }, [currentMediaIndex]);

    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            const timer = setTimeout(() => {
                const playPromise = video.play();
                if (playPromise !== undefined) {
                    playPromise
                        .then(() => {
                            setIsPlaying(true);
                            console.log('Video autoplay started');
                        })
                        .catch(error => {
                            console.log('Autoplay failed:', error);
                            setIsPlaying(false);
                        });
                }
            }, 500);

            return () => clearTimeout(timer);
        }
    }, []);

    return (
        <div className="bg-white py-1 mt-30">
            <div className="w-full max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section - Responsive */}
                <div className="flex flex-col lg:flex-row items-start justify-between mb-6 gap-4">
                    <div className="flex items-start w-full lg:w-auto">
                        <div className="flex-1">
                            <h1 className="text-2xl lg:text-3xl font-[500] text-gray-900 mb-2">Ferrari Purosangue 2025</h1>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 lg:flex-shrink-0">
                        <button className="p-2.5 lg:p-3 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors">
                            <Share className="w-5 h-5 text-gray-600" />
                        </button>
                        <button
                            onClick={() => setIsLiked(!isLiked)}
                            className={`p-2.5 lg:p-3 rounded-full border transition-colors ${isLiked
                                ? 'border-red-300 bg-red-50 text-red-600'
                                : 'border-gray-300 hover:bg-gray-50 text-gray-600'
                                }`}
                        >
                            <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                        </button>
                    </div>
                </div>

                {/* Gallery Grid - Adjusted Video Height */}
                <div className="flex flex-col lg:grid lg:grid-cols-[1fr_300px_300px] xl:grid-cols-[1fr_320px_320px] 2xl:grid-cols-[1fr_350px_350px] gap-2 sm:gap-3 h-auto lg:h-[292px]">
                    {/* Main Video - Set to match vertical images height */}
                    <div
                        className="relative overflow-hidden cursor-pointer rounded-tl-lg rounded-bl-lg group bg-black w-full h-[293px]"
                        onClick={(e) => {
                            if (!e.target.closest('.video-controls')) {
                                openPopup(0);
                            }
                        }}
                        onMouseEnter={() => {
                            setIsHovering(true);
                            setShowControls(true);
                        }}
                        onMouseLeave={() => {
                            setIsHovering(false);
                            setShowControls(false);
                        }}
                    >
                        <video
                            ref={videoRef}
                            src={mediaItems[0].src}
                            className="w-full h-full object-cover"
                            muted={isMuted}
                            autoPlay
                            loop
                            playsInline
                            preload="metadata"
                            onLoadedMetadata={(e) => handleVideoLoad(e.target)}
                            onTimeUpdate={(e) => handleTimeUpdate(e.target)}
                            onPlay={handleVideoPlay}
                            onPause={handleVideoPause}
                            onError={handleVideoError}
                            onLoadStart={handleVideoLoadStart}
                            onCanPlay={handleVideoCanPlay}
                            onDurationChange={(e) => handleVideoLoad(e.target)}
                            onClick={(e) => e.stopPropagation()}
                            crossOrigin="anonymous"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20">
                            <div className="absolute top-3 lg:top-4 left-3 lg:left-4">
                                <div className="bg-purple-600 text-white px-2 sm:px-3 lg:px-4 py-1 sm:py-1.5 lg:py-2 rounded-full text-xs lg:text-sm font-medium flex items-center gap-1 sm:gap-1.5">
                                    <span className="text-yellow-300">✨</span>
                                    Featured
                                </div>
                            </div>

                            <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${(isHovering || !isPlaying) ? 'opacity-100' : 'opacity-0'
                                }`}>
                                <button
                                    onClick={togglePlayPause}
                                    className="w-12 sm:w-16 lg:w-20 h-12 sm:h-16 lg:h-20 bg-white/90 rounded-full flex items-center justify-center hover:scale-110 hover:bg-white transition-all duration-200 shadow-lg video-controls"
                                >
                                    {isPlaying ? (
                                        <Pause className="w-5 sm:w-6 lg:w-8 h-5 sm:h-6 lg:h-8 text-gray-900" fill="currentColor" />
                                    ) : (
                                        <Play className="w-5 sm:w-6 lg:w-8 h-5 sm:h-6 lg:h-8 text-gray-900 ml-0.5 sm:ml-1" fill="currentColor" />
                                    )}
                                </button>
                            </div>

                            <div className={`video-controls absolute bottom-0 left-0 right-0 p-3 sm:p-4 transition-all duration-300 ${showControls || !isPlaying ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                                }`}>
                                <div
                                    className="w-full h-1 bg-white/30 rounded-full cursor-pointer hover:h-1.5 transition-all duration-200 mb-2 sm:mb-3"
                                    onClick={handleProgressClick}
                                    onMouseDown={handleProgressMouseDown}
                                    onMouseMove={handleProgressMouseMove}
                                    onMouseUp={handleProgressMouseUp}
                                >
                                    <div
                                        className="h-full bg-white rounded-full transition-all duration-100 relative"
                                        style={{
                                            width: duration > 0 ? `${(currentTime / duration) * 100}%` : '0%'
                                        }}
                                    >
                                        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 sm:w-3 h-2 sm:h-3 bg-white rounded-full opacity-0 hover:opacity-100 transition-opacity duration-200 shadow-md"></div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between text-white text-xs sm:text-sm">
                                    <div className="flex items-center gap-2 sm:gap-3">
                                        <button
                                            onClick={togglePlayPause}
                                            className="hover:scale-110 transition-transform duration-200"
                                        >
                                            {isPlaying ? (
                                                <Pause className="w-4 h-4" fill="currentColor" />
                                            ) : (
                                                <Play className="w-4 h-4" fill="currentColor" />
                                            )}
                                        </button>

                                        <div className="flex items-center gap-1 sm:gap-2 group/volume">
                                            <button
                                                onClick={toggleMute}
                                                className="hover:scale-110 transition-transform duration-200"
                                            >
                                                {isMuted || volume === 0 ? (
                                                    <VolumeX className="w-4 h-4" />
                                                ) : volume < 0.5 ? (
                                                    <Volume2 className="w-4 h-4" />
                                                ) : (
                                                    <Volume2 className="w-4 h-4" />
                                                )}
                                            </button>

                                            <div className="opacity-0 group-hover/volume:opacity-100 transition-opacity duration-200 hidden lg:block">
                                                <input
                                                    type="range"
                                                    min="0"
                                                    max="1"
                                                    step="0.1"
                                                    value={isMuted ? 0 : volume}
                                                    onChange={handleVolumeChange}
                                                    className="w-12 sm:w-16 h-1 bg-white/30 rounded-full appearance-none cursor-pointer"
                                                    style={{
                                                        background: `linear-gradient(to right, white 0%, white ${(isMuted ? 0 : volume) * 100}%, rgba(255,255,255,0.3) ${(isMuted ? 0 : volume) * 100}%, rgba(255,255,255,0.3) 100%)`
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        <span className="text-xs font-medium min-w-max">
                                            {formatTime(currentTime)} / {formatTime(duration)}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2 sm:gap-3">
                                        <button
                                            onClick={handleFullscreen}
                                            className="hover:scale-110 transition-transform duration-200"
                                        >
                                            <Maximize className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* First Column of Side Images */}
                    <div className="grid grid-cols-2 lg:grid-cols-1 lg:grid-rows-2 gap-2 sm:gap-3 w-full lg:w-[300px] xl:w-[320px] 2xl:w-[350px] h-auto lg:h-[292px]">
                        <div
                            className="relative overflow-hidden cursor-pointer group"
                            style={{ height: '150px' }}
                            onClick={() => openPopup(1)}
                        >
                            <img
                                src={mediaItems[1].src}
                                alt="Ferrari Steering Wheel"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                        </div>
                        <div
                            className="relative overflow-hidden cursor-pointer group"
                            style={{ height: '142px' }}
                            onClick={() => openPopup(2)}
                        >
                            <img
                                src={mediaItems[2].src}
                                alt="Ferrari Badge"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                        </div>
                    </div>

                    {/* Second Column of Side Images - Show All Photos Button on Last Image */}
                    <div className="grid grid-cols-2 lg:grid-cols-1 lg:grid-rows-2 gap-2 sm:gap-3 w-full lg:w-[300px] xl:w-[320px] 2xl:w-[350px] h-auto lg:h-[292px]">
                        <div
                            className="relative overflow-hidden cursor-pointer group lg:rounded-tr-lg"
                            style={{ height: '150px' }}
                            onClick={() => openPopup(3)}
                        >
                            <img
                                src={mediaItems[3].src}
                                alt="Ferrari Interior"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                        </div>
                        <div
                            className="relative overflow-hidden cursor-pointer group lg:rounded-br-lg"
                            style={{ height: '142px' }}
                            onClick={() => openPopup(4)}
                        >
                            <img
                                src={mediaItems[4].src}
                                alt="Ferrari Exterior"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>

                            {/* Show All Photos Button - Only on Last Image */}
                            <div className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        openPopup(0);
                                    }}
                                    className="bg-white text-gray-900 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm font-medium hover:bg-gray-100 transition-colors border border-gray-200 flex items-center gap-1"
                                >
                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd" />
                                        <path d="M11 14l-2.5-2.5L6 14h5z" />
                                    </svg>
                                    Show all photos
                                </button>
                            </div>

                            {/* Dots Overlay - Positioned at bottom left */}
                            <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3">
                                {/* <div className="flex gap-1">
                                    {mediaItems.map((_, index) => (
                                        <div
                                            key={index}
                                            className={`w-1.5 h-1.5 rounded-full transition-colors ${index === 0 ? 'bg-white' : 'bg-white/50'
                                                }`}
                                        />
                                    ))}
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Popup Modal - Responsive */}
                {isPopupOpen && (
                    <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center">
                        <div className="relative w-full h-full flex items-center justify-center">
                            <button
                                onClick={closePopup}
                                className="absolute top-4 lg:top-6 right-4 lg:right-6 z-10 w-10 lg:w-12 h-10 lg:h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                            >
                                <X className="w-5 lg:w-6 h-5 lg:h-6 text-white" />
                            </button>
                            <button
                                onClick={prevMedia}
                                className="absolute left-4 lg:left-6 z-10 w-10 lg:w-12 h-10 lg:h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                            >
                                <ChevronLeft className="w-5 lg:w-6 h-5 lg:h-6 text-white" />
                            </button>
                            <button
                                onClick={nextMedia}
                                className="absolute right-4 lg:right-6 z-10 w-10 lg:w-12 h-10 lg:h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                            >
                                <ChevronRight className="w-5 lg:w-6 h-5 lg:h-6 text-white" />
                            </button>
                            <div className="w-full max-w-[90vw] lg:max-w-5xl xl:max-w-6xl max-h-[80vh] mx-4 lg:mx-6">
                                {mediaItems[currentMediaIndex].type === 'video' ? (
                                    <video
                                        ref={popupVideoRef}
                                        src={mediaItems[currentMediaIndex].src}
                                        className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
                                        controls
                                        preload="metadata"
                                    />
                                ) : (
                                    <img
                                        src={mediaItems[currentMediaIndex].src}
                                        alt={mediaItems[currentMediaIndex].title}
                                        className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
                                        loading="lazy"
                                    />
                                )}
                            </div>
                            <div className="absolute bottom-4 lg:bottom-6 left-1/2 transform -translate-x-1/2">
                                <div className="bg-white/20 backdrop-blur-sm text-white px-4 lg:px-5 py-2 lg:py-2.5 rounded-full text-sm lg:text-base">
                                    {currentMediaIndex + 1} / {mediaItems.length}
                                </div>
                            </div>
                            <div className="absolute bottom-16 lg:bottom-20 left-1/2 transform -translate-x-1/2">
                                <div className="flex gap-2 lg:gap-3">
                                    {mediaItems.map((item, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentMediaIndex(index)}
                                            className={`relative w-12 lg:w-16 h-9 lg:h-12 rounded-md overflow-hidden border-2 transition-all ${currentMediaIndex === index
                                                ? 'border-white scale-110'
                                                : 'border-white/30 hover:border-white/60'
                                                }`}
                                        >
                                            <img
                                                src={item.src}
                                                alt={`Thumbnail ${index + 1}`}
                                                className="w-full h-full object-cover"
                                                loading="lazy"
                                            />
                                            {item.type === 'video' && (
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <Play className="w-2.5 lg:w-3 h-2.5 lg:h-3 text-white" fill="currentColor" />
                                                </div>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FerrariMediaGallery;
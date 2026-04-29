import React from "react";
import { Link } from "react-router-dom";
import { ExternalLink, ArrowRight } from "lucide-react";
import { toSlug } from "../utils/slug";

const CardProject = ({ Img, Title, Description, Link: ProjectLink, id }) => {
  const [imgLoaded, setImgLoaded] = React.useState(false);
  const [imgError, setImgError] = React.useState(false);

  const handleLiveDemo = (e) => {
    if (!ProjectLink || ProjectLink === "#") {
      e.preventDefault();
      alert("Live demo link is not available for this project");
    }
  };

  const handleDetails = (e) => {
    if (!id) {
      e.preventDefault();
      alert("Project details are not available");
    }
  };

  // Placeholder image kalo error
  const placeholderImage = "https://placehold.co/800x400/1e1b4b/818cf8?text=No+Image";

  return (
    <div className="group relative w-full h-full">
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-lg border border-white/10 shadow-2xl transition-all duration-300 hover:shadow-purple-500/20 hover:border-purple-500/30 h-full flex flex-col">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
        
        {/* Shimmer effect on hover */}
        <div className="absolute -inset-full group-hover:inset-full bg-gradient-to-r from-transparent via-white/5 to-transparent transition-all duration-1000 -skew-x-12 pointer-events-none"></div>

        <div className="relative p-5 z-10 flex flex-col h-full">
          <div className="relative overflow-hidden rounded-lg bg-slate-800/50">
            {!imgLoaded && !imgError && (
              <div className="absolute inset-0 bg-white/5 animate-pulse" />
            )}
            <img
              src={imgError ? placeholderImage : Img}
              alt={`${Title} project thumbnail`}
              loading="lazy"
              className={`w-full h-full object-cover aspect-[16/8] transform group-hover:scale-105 transition-transform duration-500 ${
                imgLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setImgLoaded(true)}
              onError={() => {
                setImgError(true);
                setImgLoaded(true);
              }}
            />
          </div>

          <div className="mt-4 space-y-3 flex-grow">
            <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent line-clamp-1">
              {Title || "Untitled Project"}
            </h3>

            <p className="text-gray-300/80 text-sm leading-relaxed line-clamp-2">
              {Description || "No description available"}
            </p>

            <div className="pt-4 flex items-center justify-between gap-3">
              {ProjectLink && ProjectLink !== "#" ? (
                <a
                  href={ProjectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLiveDemo}
                  className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-all duration-200 hover:translate-x-0.5"
                  aria-label={`Live demo of ${Title}`}
                >
                  <span className="text-sm font-medium">Live Demo</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              ) : (
                <span className="text-gray-500 text-sm cursor-not-allowed">
                  Demo Unavailable
                </span>
              )}

              {id ? (
                <Link
                  to={`/project/${toSlug(Title)}`}
                  onClick={handleDetails}
                  className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/90 transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-500/50 group/btn"
                  aria-label={`View details of ${Title}`}
                >
                  <span className="text-sm font-medium">Details</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
                </Link>
              ) : (
                <span className="text-gray-500 text-sm cursor-not-allowed">
                  Details Unavailable
                </span>
              )}
            </div>
          </div>

          <div className="absolute inset-0 border border-white/0 group-hover:border-purple-500/50 rounded-xl transition-colors duration-300 pointer-events-none -z-50"></div>
        </div>
      </div>
    </div>
  );
};

export default CardProject;

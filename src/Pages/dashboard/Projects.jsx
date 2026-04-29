// src/components/HomeProjects.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "../supabase";
import { ExternalLink, Github } from "lucide-react";
import { getProjectImage } from "../utils/projectImages";

const HomeProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });
      
      setProjects(data || []);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const SkeletonCard = () => (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="w-full h-48 bg-gray-200 animate-pulse" />
      <div className="p-6">
        <div className="h-6 bg-gray-200 rounded mb-2 animate-pulse w-3/4" />
        <div className="h-4 bg-gray-200 rounded mb-1 animate-pulse w-full" />
        <div className="h-4 bg-gray-200 rounded mb-4 animate-pulse w-2/3" />
        <div className="flex gap-2 mb-4">
          <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse" />
          <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse" />
        </div>
        <div className="flex gap-3">
          <div className="h-10 w-24 bg-gray-200 rounded animate-pulse" />
          <div className="h-10 w-24 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <section className="py-16 px-4 bg-orange-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1,2,3,4,5,6].map(i => <SkeletonCard key={i} />)}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 bg-orange-50">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          className="text-3xl md:text-4xl text-stone-800 mb-6"
          style={{ fontFamily: "satoshi-black" }}
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          My Projects
        </motion.h2>

        <motion.p
          className="mb-10 text-zinc-600 leading-relaxed max-w-2xl mx-auto text-base"
          style={{ fontFamily: "satoshi-medium" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Here are some of the projects I've worked on, showcasing my skills in
          creating functional, visually appealing, and user-friendly websites.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              {/* 🔥 GALAT DI SINI: GAMBAR PAKE MAPPING LOCAL, BUKAN DARI SUPABASE */}
              <div className="relative overflow-hidden h-48 bg-gray-100">
                <img
                  src={getProjectImage(project.Title)}
                  alt={project.Title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              <div className="p-6 text-left flex flex-col flex-grow">
                <h3
                  className="text-xl font-semibold text-stone-800 mb-2 line-clamp-1"
                  style={{ fontFamily: "satoshi-bold" }}
                >
                  {project.Title}
                </h3>

                <p
                  className="text-zinc-600 text-sm mb-4 line-clamp-3 flex-grow"
                  style={{ fontFamily: "satoshi-medium" }}
                >
                  {project.Description}
                </p>

                {project.TechStack?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.TechStack.slice(0, 3).map((tech, i) => (
                      <span
                        key={i}
                        className="bg-rose-100 text-rose-700 px-2 py-1 rounded-full text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.TechStack.length > 3 && (
                      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                        +{project.TechStack.length - 3}
                      </span>
                    )}
                  </div>
                )}

                <div className="flex flex-wrap gap-3 mt-2">
                  {project.Link && project.Link !== "#" && (
                    <a
                      href={project.Link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-rose-400 hover:bg-rose-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Live Demo
                    </a>
                  )}
                  
                  {project.Github && project.Github !== "Private" && (
                    <a
                      href={project.Github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-stone-700 hover:bg-stone-800 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                    >
                      <Github className="w-3.5 h-3.5" />
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeProjects;

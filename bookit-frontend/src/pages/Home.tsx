import React, { useEffect } from "react";
import { Hero } from "../components/common/Hero";
import { ExperienceList } from "../components/common/ExperienceList";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchExperiences } from "../features/experience/experienceSlice";
import { Experience } from "../types";

export const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { experiences, loading } = useAppSelector((state) => state.experience);

  useEffect(() => {
    dispatch(fetchExperiences());
  }, [dispatch]);

  // Ensure experiences always has a fallback empty array
  const experienceList: Experience[] = experiences || [];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 px-6 md:px-12 py-8">
        <Hero />
        {loading ? (
          <p className="text-center text-gray-600 mt-10">
            Loading experiences...
          </p>
        ) : (
          <ExperienceList experiences={experienceList} />
        )}
      </main>
      <Footer />
    </div>
  );
};

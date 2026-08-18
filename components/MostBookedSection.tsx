import React from "react";

import HomeServiceSection from "@/components/HomeServiceSection";

import { mostBookedServices } from "@/data/mostBooked";

export default function MostBookedSection() {

  return (

    <HomeServiceSection
      title="⭐ Most Booked Services"
      route="/category/most-booked"
      data={mostBookedServices}
    />

  );

}
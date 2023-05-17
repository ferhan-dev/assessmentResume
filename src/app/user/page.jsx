"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";

import logo from "../../../public/favicon.png";

function User() {
  const [userData, setUserData] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://joba-network-staging.herokuapp.com/api/auth/user/0xb75A08E82A1Bf0FccEb89bbdAf9AAE00BE8CA29a"
        );
        setUserData([res.data.user]);
        setProjects(res.data.projects);
      } catch (error) {
        console.log(error, "error");
      }
    };

    fetchData();
  }, []);
  console.log(projects, "check");
  if (!userData) {
    return <div>Loading...</div>;
  }

  console.log(userData, "oops");
  return (
    <div>
      <header className="bg-blue-500 text-white py-2 px-4">
        <div className="flex items-center">
          <Image
            src={logo}
            width={50}
            height={50}
            className="rounded-full"
            alt="Company Logo"
          />
          <h1 className="text-lg font-semibold">Joba</h1>
        </div>
      </header>
      <div className="w-[90%] m-auto">
        {userData.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-md rounded-lg p-6  mx-auto mt-6"
          >
            <div className="mt-6 ml-6">
              <img
                src={item.profile_photo}
                alt="Profile Photo"
                width={70}
                height={70}
                className="rounded-full"
              />
            </div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold">{item.display_name}</h2>
              <p className="text-lg ">{item.email}</p>
              <p className="text-lg ">{item.phone.number}</p>
              <p className="text-lg ">
                {item.residential_address.street_address},{" "}
                {item.residential_address.city},{" "}
                {item.residential_address.country}
              </p>
              <p className="text-lg ">{item.telegram_user_link}</p>
            </div>
          </div>
        ))}
        <div className="mb-6">
          <h3 className=" font-bold mb-2 mt-6">
            Projects (total earnings:1.0628 x DAI )
          </h3>
          <h3 className=" font-bold mb-2 mt-6">Completed Projects : 1 </h3>
          <h3 className=" font-bold mb-2 mt-6">Disputed Projects : 1 </h3>
          <div className="flex items-center">
            <Image
              src={logo}
              width={50}
              height={50}
              className="rounded-full"
              alt="Company Logo"
            />
            <h1 className="text-lg font-semibold">Joba</h1>
          </div>
          <h2 className=" font-bold mb-2 mt-6">
            Projects (total earnings:1.0628 x DAI )
          </h2>
        </div>

        {projects.length > 0
          ? projects.map((items) => {
              return (
                <>
                  <div className=" bg-blue-100 p-2 rounded-md mb-4">
                    <div className="flex">
                      <div className="font-bold">{items.name}</div>
                      <div
                        className={`${"ml-4 border-2  pt-1 pb-1 pl-4 pr-4 rounded-full bg-white"} ${
                          items.status === "pending"
                            ? "text-red-400 border-red-400"
                            : items.status === "in progress"
                            ? "text-red-700 border-red-700"
                            : items.status === "dispute"
                            ? "text-purple-400 border-purple-400"
                            : items.status === "rejected"
                            ? "text-red-400 border-red-400"
                            : items.status === "complete"
                            ? "text-green-400 border-green-400"
                            : "text-red-400 border-red-400"
                        }`}
                      >
                        {items.status}
                      </div>
                    </div>
                    <div>{items.description}</div>
                  </div>
                </>
              );
            })
          : ""}
      </div>
    </div>
  );
}

export default User;

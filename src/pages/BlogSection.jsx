// // BlogSection.jsx
// import React from "react";
// import BlogCard from "../components/BlogCard"; // Ensure the path is correct

// const BlogSection = () => {
//   // Hardcoded blog data for now
//   const blogs = [
//     {
//       id: 1,
//       title: "Understanding Financial Planning",
//       image: "https://example.com/image1.jpg",
//       excerpt: "Learn the basics of financial planning and secure your future.",
//       url: "https://example.com/blog1",
//     },
//     {
//       id: 2,
//       title: "5 Tips to Improve Your Budgeting Skills",
//       image: "https://example.com/image2.jpg",
//       excerpt: "Master your budgeting skills with these easy tips.",
//       url: "https://example.com/blog2",
//     },
//     {
//       id: 3,
//       title: "The Importance of Emergency Funds",
//       image: "https://example.com/image3.jpg",
//       excerpt: "Why you need an emergency fund and how to build one.",
//       url: "https://example.com/blog3",
//     },
//     {
//       id: 4,
//       title: "Investing 101: A Beginner's Guide",
//       image: "https://example.com/image4.jpg",
//       excerpt: "A comprehensive guide to start your investment journey.",
//       url: "https://example.com/blog4",
//     },
//     {
//       id: 5,
//       title: "Debt Management Strategies",
//       image: "https://example.com/image5.jpg",
//       excerpt: "Effective ways to manage and pay off your debts.",
//       url: "https://example.com/blog5",
//     },
//     {
//       id: 6,
//       title: "Understanding Credit Scores",
//       image: "https://example.com/image6.jpg",
//       excerpt: "How credit scores work and why they matter.",
//       url: "https://example.com/blog6",
//     },
//     {
//       id: 7,
//       title: "Saving for Retirement: What You Need to Know",
//       image: "https://example.com/image7.jpg",
//       excerpt: "Tips on saving for retirement, no matter your age.",
//       url: "https://example.com/blog7",
//     },
//   ];

//   return (
//     <div className="flex flex-col items-center">
//       <h1 className="text-3xl font-bold mb-6">Latest Blogs</h1>
//       <div className="flex overflow-x-auto space-x-4">
//         {blogs.map((blog) => (
//           <BlogCard
//             key={blog.id}
//             title={blog.title}
//             image={blog.image}
//             excerpt={blog.excerpt}
//             url={blog.url}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default BlogSection;


// BlogSection.jsx
import React from "react";
import BlogCard from "../components/BlogCard"; // Ensure the path is correct

const BlogSection = () => {
  // Hardcoded blog data for now
  const blogs = [
    {
      id: 1,
      title: "Understanding Financial Planning",
      image: "https://example.com/image1.jpg",
      excerpt: "Learn the basics of financial planning and secure your future.",
      url: "https://example.com/blog1",
    },
    {
      id: 2,
      title: "5 Tips to Improve Your Budgeting Skills",
      image: "https://example.com/image2.jpg",
      excerpt: "Master your budgeting skills with these easy tips.",
      url: "https://example.com/blog2",
    },
    {
      id: 3,
      title: "The Importance of Emergency Funds",
      image: "https://example.com/image3.jpg",
      excerpt: "Why you need an emergency fund and how to build one.",
      url: "https://example.com/blog3",
    },
    {
      id: 4,
      title: "Investing 101: A Beginner's Guide",
      image: "https://example.com/image4.jpg",
      excerpt: "A comprehensive guide to start your investment journey.",
      url: "https://example.com/blog4",
    },
    {
      id: 5,
      title: "Debt Management Strategies",
      image: "https://example.com/image5.jpg",
      excerpt: "Effective ways to manage and pay off your debts.",
      url: "https://example.com/blog5",
    },
    {
      id: 6,
      title: "Understanding Credit Scores",
      image: "https://example.com/image6.jpg",
      excerpt: "How credit scores work and why they matter.",
      url: "https://example.com/blog6",
    },
    {
      id: 7,
      title: "Saving for Retirement: What You Need to Know",
      image: "https://example.com/image7.jpg",
      excerpt: "Tips on saving for retirement, no matter your age.",
      url: "https://example.com/blog7",
    },
  ];

  return (
    <div className="flex flex-col">
      {blogs.map((blog) => (
        <BlogCard
          key={blog.id}
          title={blog.title}
          image={blog.image}
          excerpt={blog.excerpt}
          url={blog.url}
        />
      ))}
    </div>
  );
};

export default BlogSection;

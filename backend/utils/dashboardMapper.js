// Takes backend dashboard response and maps it into frontend-friendly sections
export const mapDashboardResponse = (data) => {
  if (!data) return { profile: {}, purchases: [], enrollments: [] };

  const profileCard = {
    id: data.profile.user_id,
    name: data.profile.name,
    email: data.profile.email,
    avatar: data.profile.avatar_url,
    joined: new Date(data.profile.created_at).toLocaleDateString()
  };

  const purchaseCards = data.purchases.map(p => ({
    id: p.purchase_id,
    amount: `₹${p.amount}`,
    paymentId: p.payment_id,
    date: new Date(p.created_at).toLocaleDateString(),
    type: p.course_id ? "Course" : "Group",
    title: p.course_title || p.group_title
  }));

  const enrollmentCards = data.enrollments.map(e => ({
    id: e.enrollment_id,
    status: e.payment_status,
    date: new Date(e.enrolled_at).toLocaleDateString(),
    course: {
      id: e.course_id,
      title: e.title,
      description: e.description,
      price: `₹${e.price}`,
      thumbnail: e.thumbnail
    },
    group: e.group_id ? { id: e.group_id, title: e.group_title } : null
  }));

  return {
    profile: profileCard,
    purchases: purchaseCards,
    enrollments: enrollmentCards
  };
};
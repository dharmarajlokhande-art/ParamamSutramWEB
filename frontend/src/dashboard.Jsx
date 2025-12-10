import { mapDashboardResponse } from '../utils/dashboardMapper';

function Dashboard({ dashboardData }) {
  const { profile, purchases, enrollments } = mapDashboardResponse(dashboardData);

  return (
    <div>
      {/* Profile Card */}
      <section>
        <img src={profile.avatar} alt={profile.name} />
        <h2>{profile.name}</h2>
        <p>{profile.email}</p>
        <small>Joined: {profile.joined}</small>
      </section>

      {/* Purchases Section */}
      <section>
        <h3>My Purchases</h3>
        {purchases.map(p => (
          <div key={p.id}>
            <strong>{p.title}</strong> ({p.type}) — {p.amount}
            <br />
            Payment ID: {p.paymentId} | Date: {p.date}
          </div>
        ))}
      </section>

      {/* Enrollments Section */}
      <section>
        <h3>My Courses</h3>
        {enrollments.map(e => (
          <div key={e.id}>
            <img src={e.course.thumbnail} alt={e.course.title} width="100" />
            <strong>{e.course.title}</strong> — {e.course.price}
            <br />
            Status: {e.status} | Enrolled: {e.date}
            {e.group && <p>Part of Group: {e.group.title}</p>}
          </div>
        ))}
      </section>
    </div>
  );
}
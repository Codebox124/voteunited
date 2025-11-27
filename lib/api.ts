export async function upvoteMember(memberId: string | number) {
  const ipRes = await fetch("https://api.ipify.org?format=json");
  const { ip } = await ipRes.json();

  const res = await fetch("/api/upvote", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ip,
      member_id: memberId,
    }),
  });

  return res.json();
}

export async function downvoteMember(memberId: string | number) {
  const ipRes = await fetch("https://api.ipify.org?format=json");
  const { ip } = await ipRes.json();

  const res = await fetch("/api/downvote", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ip,
      member_id: memberId,
    }),
  });

  return res.json();
}

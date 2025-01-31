'use client';

import { Box, Button, Card, Typography, Avatar, Stack } from '@mui/material';

const leaderboardData = [
  { name: 'Iman', time: '10min 5s', score: 52, img: '/iman.jpg' },
  { name: 'Vatani', time: '10min 5s', score: 52, img: '/vatani.jpg' },
  { name: 'Jonathan', time: '10min 5s', score: 52, img: '/jonathan.jpg' },
  { name: 'Neuman', time: '10min 5s', score: 52, img: '/neuman.jpg' },
  { name: 'Nick', time: '10min 5s', score: 52, img: '/nick.jpg' },
];

export default function ExamLeaderboard() {
  return (
    <Box sx={{ textAlign: 'center', p: 4, bgcolor: '#E6F3EC', minHeight: '100vh' }}>
      <Typography variant="subtitle2" color="textSecondary">7th Oct 2024</Typography>
      <Typography variant="h5" color="primary" fontWeight={600}>Exam Leaderboard</Typography>
      <Typography variant="body2" color="secondary" sx={{ cursor: 'pointer', textDecoration: 'underline', mt: 1 }}>
        View Past Winners &gt;
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', mt: 4, gap: 3 }}>
        {[
          { name: 'Vatani', img: '/vatani.jpg', rank: 2, borderColor: 'silver', size: 64 },
          { name: 'Iman', img: '/iman.jpg', rank: 1, borderColor: 'gold', size: 80, crown: true },
          { name: 'Jonathan', img: '/jonathan.jpg', rank: 3, borderColor: 'bronze', size: 64 },
        ].map((user, index) => (
          <Stack key={index} alignItems="center" position="relative">
            {user.crown && <Typography sx={{ position: 'absolute', top: -30, left: '50%', transform: 'translateX(-50%)', fontSize: 24 }}>👑</Typography>}
            <Avatar src={user.img} sx={{ width: user.size, height: user.size, border: `3px solid ${user.borderColor}`, position: 'relative' }} />
            <Box sx={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', bgcolor: '#fff', borderRadius: '50%', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, border: '2px solid #ccc' }}>
              {user.rank}
            </Box>
            <Typography variant="body1" fontWeight={600} sx={{ mt: 1 }}>{user.name}</Typography>
          </Stack>
        ))}
      </Box>

      <Card sx={{ mt: 4, p: 2, maxWidth: 500, mx: 'auto', borderRadius: 2, bgcolor: '#fff', boxShadow: 2 }}>
        {leaderboardData.map((user, index) => (
          <Stack key={index} direction="row" justifyContent="space-between" alignItems="center" sx={{ py: 1, px: 2, borderRadius: 1, bgcolor: index < 3 ? '#E6F3EC' : 'transparent' }}>
            <Stack direction="row" alignItems="center" gap={1} sx={{ flex: 1, position: 'relative' }}>
              <Avatar src={user.img} sx={{ width: 32, height: 32, border: '2px solid #ccc' }} />
              <Typography variant="body1" fontWeight={600}>{user.name}</Typography>
            </Stack>
            <Typography variant="body2" color="textSecondary" sx={{ flexShrink: 0 }}>{user.time}</Typography>
          </Stack>
        ))}
      </Card>

      <Button fullWidth variant="contained" sx={{ mt: 3, bgcolor: '#00A86B', color: '#fff', px: 4, py: 1.5, borderRadius: 2, fontSize: 16 }}>
        Start the exam, claim your rank!
      </Button>
    </Box>
  );
}

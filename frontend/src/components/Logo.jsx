import Box from '@mui/material/Box';

function Logo({ src, alt }) {
  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <Box
        component="img"
        alt={alt}
        src={src}
        sx={{
          width: '80px',
          height: '50px',
        }}
      />
    </Box>
  );
}

export default Logo;

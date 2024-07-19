import { Prisma } from '@prisma/client';

export const usersSeed: Prisma.UserUpsertArgs[] = [
  {
    where: { email: 'admin@mail.com' },
    create: {
      password: '$2b$10$EwzEVv5/K7yMtc8ZQDi9J.jHCwCDhHcfFnxms4QjM.3jeCW/Kkt2i',
      role: 'ADMIN',
      email: 'admin@mail.com',
    },
    update: {},
  },
  {
    where: { email: 'staff1@mail.com' },
    create: {
      password: '$2b$10$EwzEVv5/K7yMtc8ZQDi9J.jHCwCDhHcfFnxms4QjM.3jeCW/Kkt2i',
      role: 'STAFF',
      email: 'staff1@mail.com',
      profile: {
        create: {
          firstName: 'Liam',
          lastName: 'Thompson',
          nickName: 'The Machine',
          phone: '1234567890',
          avatar:
            'https://images.unsplash.com/photo-1613627219671-7cceb8df143d?q=80&w=720&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          bio: `Liam, known as "The Machine" for his lightning-fast speed and unwavering precision, is a black and grey realism artist who specializes in intricate and ambitious projects. His technical mastery allows him to tackle even the most detailed designs with incredible accuracy, ensuring every line and shading element contributes to the overall masterpiece. Whether you have a complex geometric pattern in mind or a hyper-realistic portrait with intricate details, Liam's technical virtuosity will translate your vision into a breathtaking tattoo.`,
          specialization: 'Tattoo artist',
        },
      },
      socials: {
        createMany: {
          data: [
            { title: 'instagram', link: 'https://www.instagram.com/' },
            { title: 'X', link: 'https://x.com/' },
            { title: 'TikTok', link: 'https://www.tiktok.com/' },
          ],
        },
      },
      services: {
        create: {
          title: 'Technical Virtuosity for Complex Designs',
          description: `Liam, known as "The Machine" for his lightning-fast speed and unwavering precision, is a black and grey realism artist who specializes in intricate and ambitious projects. His technical mastery allows him to tackle even the most detailed designs with incredible accuracy, ensuring every line and shading element contributes to the overall masterpiece. Whether you have a complex geometric pattern in mind or a hyper-realistic portrait with intricate details, Liam's technical virtuosity will translate your vision into a breathtaking tattoo.`,
          image:
            'https://images.pexels.com/photos/4125659/pexels-photo-4125659.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          duration: 60,
          price: 300,
          service: {
            create: {
              title: 'Fine Line Tattoos: Delicate Artwork for a Subtle Touch',
              description: `For those who prefer a more subtle aesthetic, our artists specialize in creating fine line tattoos with exceptional detail. These delicate pieces are perfect for minimalist designs, intricate patterns, or elegant script work. Our experienced artists ensure precision and a light touch to create a beautiful and sophisticated tattoo.`,
              image:
                'https://images.unsplash.com/photo-1568515045052-f9a854d70bfd?q=80&w=720&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              order: 1,
            },
          },
        },
      },
    },
    update: {},
  },
  {
    where: { email: 'staff2@mail.com' },
    create: {
      password: '$2b$10$EwzEVv5/K7yMtc8ZQDi9J.jHCwCDhHcfFnxms4QjM.3jeCW/Kkt2i',
      role: 'STAFF',
      email: 'staff2@mail.com',
      profile: {
        create: {
          firstName: 'Sarah',
          lastName: 'Jones',
          nickName: 'Sparkle',
          phone: '1234567890',
          avatar:
            'https://images.pexels.com/photos/7005737/pexels-photo-7005737.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          bio: 'Sarah, known as "Sparkle" for her infectious enthusiasm and gentle touch, is a rising star in the black and grey realism world. She brings her passion for art and keen eye for detail to create stunningly realistic tattoos with a distinct soft touch. Sarah specializes in delicate shading and textures, ensuring a beautiful and timeless piece of body art.',
          specialization: 'Tattoo artist',
        },
      },
      socials: {
        createMany: {
          data: [
            { title: 'instagram', link: 'https://www.instagram.com/' },
            { title: 'X', link: 'https://x.com/' },
            { title: 'TikTok', link: 'https://www.tiktok.com/' },
          ],
        },
      },
      services: {
        create: {
          title: 'Delicate Realism with a Soft Touch',
          description: `Sarah, nicknamed "Sparkle" for her gentle approach and detailed work, specializes in black and grey realism with a focus on delicate shading and textures. Her signature style is perfect for those who want a photorealistic tattoo with a softer touch. Sarah excels at creating stunning portraits that capture the essence of your loved ones with incredible detail.`,
          image:
            'https://images.pexels.com/photos/2865412/pexels-photo-2865412.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          duration: 60,
          price: 200,
          service: {
            create: {
              title: 'Black & Grey Realism Tattoos: Capture Stunning Detail',
              description: `Our artists are masters of black and grey realism, a technique that creates incredibly lifelike tattoos with incredible depth and dimension. Whether you want a portrait of a loved one, a hyper-realistic animal, or a breathtaking landscape, our artists can capture every detail with stunning precision.`,
              image:
                'https://images.pexels.com/photos/2865412/pexels-photo-2865412.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
              order: 2,
            },
          },
        },
      },
    },
    update: {},
  },
  {
    where: { email: 'staff3@mail.com' },
    create: {
      password: '$2b$10$EwzEVv5/K7yMtc8ZQDi9J.jHCwCDhHcfFnxms4QjM.3jeCW/Kkt2i',
      role: 'STAFF',
      email: 'staff3@mail.com',
      profile: {
        create: {
          firstName: 'Ethan',
          lastName: 'Walker',
          nickName: 'The Bold',
          phone: '1234567890',
          avatar:
            'https://images.unsplash.com/photo-1628802634987-56dcd0de35e6?q=80&w=720&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          bio: `Ethan, known as "The Bold" for his signature use of bold lines and striking colors, is a seasoned traditional tattoo artist with a deep respect for the art form's history. He takes classic designs and breathes new life into them with vibrant colors and a modern edge.`,
          specialization: 'Tattoo artist',
        },
      },
      socials: {
        createMany: {
          data: [
            { title: 'instagram', link: 'https://www.instagram.com/' },
            { title: 'X', link: 'https://x.com/' },
            { title: 'TikTok', link: 'https://www.tiktok.com/' },
          ],
        },
      },
      services: {
        create: {
          title: 'Master of Bold Lines & Classic Designs',
          description: `If you're looking for a bold and timeless tattoo rooted in traditional style, Ethan is your artist. His expertise in clean lines, vibrant colors, and classic motifs ensures a tattoo that will stand the test of time.`,
          image:
            'https://images.unsplash.com/photo-1565058379802-bbe93b2f703a?q=80&w=720&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',

          duration: 60,
          price: 300,
          service: {
            create: {
              title: `Traditional & Neo-Traditional Tattoos: Classic Designs with Modern Flair`,
              description: `Interested in a tattoo with a timeless appeal? We offer both traditional and neo-traditional tattoo styles. Traditional tattoos feature bold lines, vibrant colors, and classic symbolism, while neo-traditional tattoos incorporate a modern twist on the traditional style, offering bolder outlines and a wider range of colors.`,
              image:
                'https://images.pexels.com/photos/2126124/pexels-photo-2126124.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
              order: 3,
            },
          },
        },
      },
    },
    update: {},
  },
];

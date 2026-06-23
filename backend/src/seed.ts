/**
 * Idempotent database seed for local development and demos.
 *
 *   npm run seed
 *
 * Creates a super-admin, a verified shop with an owner, a small category tree
 * and a handful of gems spanning approved / pending / sold states so the
 * storefront, moderation queue and dashboards all have something to show.
 */
import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { AppModule } from './app.module';
import { User, UserRole, UserStatus } from './users/entities/user.entity';
import { Shop, ShopStatus } from './shops/entities/shop.entity';
import { Category } from './categories/entities/category.entity';
import { Gem, GemStatus, GemCondition, CertificationLab } from './gems/entities/gem.entity';

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

async function run() {
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: ['error', 'warn'],
  });
  const ds = app.get(DataSource);

  const userRepo = ds.getRepository(User);
  const shopRepo = ds.getRepository(Shop);
  const categoryRepo = ds.getRepository(Category);
  const gemRepo = ds.getRepository(Gem);

  const adminEmail = 'admin@gemify.com';
  if (await userRepo.findOne({ where: { email: adminEmail } })) {
    console.log('✅ Seed already applied — nothing to do.');
    await app.close();
    return;
  }

  console.log('🌱 Seeding Gemify...');

  // 1. Super admin
  await userRepo.save(
    userRepo.create({
      email: adminEmail,
      firstName: 'Gemify',
      lastName: 'Admin',
      password: bcrypt.hashSync('Admin@123', 10),
      role: UserRole.SUPER_ADMIN,
      status: UserStatus.ACTIVE,
      isEmailVerified: true,
    }),
  );

  // 2. Shop owner + shop
  const owner = await userRepo.save(
    userRepo.create({
      email: 'seller@gemify.com',
      firstName: 'Ratna',
      lastName: 'Perera',
      password: bcrypt.hashSync('Seller@123', 10),
      role: UserRole.SHOP_ADMIN,
      status: UserStatus.ACTIVE,
      isEmailVerified: true,
    }),
  );

  const shop = await shopRepo.save(
    shopRepo.create({
      name: 'Ceylon Treasures',
      slug: 'ceylon-treasures',
      description: 'Ethically sourced Sri Lankan sapphires and rare coloured stones.',
      status: ShopStatus.APPROVED,
      isActive: true,
      isVerified: true,
      isFeatured: true,
      commissionRate: 10,
      country: 'Sri Lanka',
      city: 'Ratnapura',
      owner,
    }),
  );

  // 3. Categories
  const categoryNames = ['Sapphire', 'Ruby', 'Emerald', 'Diamond'];
  const categories: Record<string, Category> = {};
  for (const name of categoryNames) {
    categories[name] = await categoryRepo.save(
      categoryRepo.create({
        name,
        slug: slugify(name),
        description: `${name} gemstones`,
        isActive: true,
      }),
    );
  }

  // 4. Gems across statuses
  const gemSeeds = [
    {
      name: 'Royal Blue Ceylon Sapphire',
      category: 'Sapphire',
      price: 8500,
      originalPrice: 9800,
      weight: 5.12,
      cut: 'Oval',
      clarity: 'VVS1',
      color: 'Royal Blue',
      origin: 'Sri Lanka',
      certificationLab: CertificationLab.GIA,
      status: GemStatus.APPROVED,
      isFeatured: true,
    },
    {
      name: 'Pigeon Blood Burmese Ruby',
      category: 'Ruby',
      price: 14200,
      weight: 3.04,
      cut: 'Cushion',
      clarity: 'VS1',
      color: 'Pigeon Blood Red',
      origin: 'Myanmar',
      certificationLab: CertificationLab.GRS,
      status: GemStatus.APPROVED,
      isFeatured: true,
    },
    {
      name: 'Colombian Emerald',
      category: 'Emerald',
      price: 6300,
      weight: 2.45,
      cut: 'Emerald Cut',
      clarity: 'VS2',
      color: 'Vivid Green',
      origin: 'Colombia',
      certificationLab: CertificationLab.SSEF,
      status: GemStatus.PENDING,
    },
    {
      name: 'Brilliant Round Diamond',
      category: 'Diamond',
      price: 11900,
      weight: 1.51,
      cut: 'Round',
      clarity: 'IF',
      color: 'D',
      origin: 'Botswana',
      certificationLab: CertificationLab.IGI,
      status: GemStatus.PENDING,
    },
    {
      name: 'Padparadscha Sapphire',
      category: 'Sapphire',
      price: 21000,
      weight: 4.18,
      cut: 'Cushion',
      clarity: 'VVS2',
      color: 'Pink-Orange',
      origin: 'Sri Lanka',
      certificationLab: CertificationLab.GUBELIN,
      status: GemStatus.SOLD,
      quantity: 0,
    },
  ];

  for (const g of gemSeeds) {
    await gemRepo.save(
      gemRepo.create({
        name: g.name,
        slug: slugify(g.name),
        description: `${g.name} — a hand-selected ${g.weight}ct ${g.color} stone from ${g.origin}.`,
        price: g.price,
        originalPrice: (g as any).originalPrice,
        weight: g.weight,
        cut: g.cut,
        clarity: g.clarity,
        color: g.color,
        origin: g.origin,
        condition: GemCondition.NEW,
        certificationLab: g.certificationLab,
        images: [
          'https://images.unsplash.com/photo-1551732998-9573f695fdbb?auto=format&fit=crop&w=800&q=80',
        ],
        mainImage:
          'https://images.unsplash.com/photo-1551732998-9573f695fdbb?auto=format&fit=crop&w=800&q=80',
        status: g.status,
        isApproved: g.status === GemStatus.APPROVED,
        isActive: true,
        isFeatured: (g as any).isFeatured ?? false,
        quantity: (g as any).quantity ?? 1,
        category: categories[g.category],
        shop,
      }),
    );
  }

  console.log('✅ Seed complete.');
  console.log('   Admin login : admin@gemify.com / Admin@123');
  console.log('   Seller login: seller@gemify.com / Seller@123');
  await app.close();
}

run().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});

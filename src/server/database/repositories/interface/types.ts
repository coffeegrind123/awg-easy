import type { InferSelectModel } from 'drizzle-orm';
import z from 'zod';
import isCidr from 'is-cidr';
import type { wgInterface } from './schema';

export type InterfaceType = InferSelectModel<typeof wgInterface>;

export type InterfaceCreateType = Omit<
  InterfaceType,
  'createdAt' | 'updatedAt'
>;

export type InterfaceUpdateType = Omit<
  InterfaceCreateType,
  'name' | 'createdAt' | 'updatedAt' | 'privateKey' | 'publicKey'
>;

const device = z
  .string({ message: t('zod.interface.device') })
  .min(1, t('zod.interface.device'))
  .pipe(safeStringRefine);

const cidr = z
  .string({ message: t('zod.interface.cidr') })
  .min(1, { message: t('zod.interface.cidr') })
  .refine((value) => isCidr(value), { message: t('zod.interface.cidrValid') })
  .pipe(safeStringRefine);

// Constants from amneziawg-go validation
const MAX_SEGMENT_SIZE = 65535; // Default (1 << 16) - 1
const MESSAGE_INITIATION_SIZE = 148;
const MESSAGE_RESPONSE_SIZE = 92;

// Amnezia documentation constraints (assuming MTU = 1280)
const MTU = 1280;
const S1_MAX_MTU = MTU - MESSAGE_INITIATION_SIZE; // 1132
const S2_MAX_MTU = MTU - MESSAGE_RESPONSE_SIZE;   // 1188

export const InterfaceUpdateSchema = schemaForType<InterfaceUpdateType>()(
  z.object({
    ipv4Cidr: cidr,
    ipv6Cidr: cidr,
    mtu: MtuSchema,
    jC: JcSchema,
    jMin: JminSchema,
    jMax: JmaxSchema,
    s1: SSchema,
    s2: SSchema,
    s3: SSchema,
    s4: SSchema,
    h1: HSchema,
    h2: HSchema,
    h3: HSchema,
    h4: HSchema,
    i1: ISchema,
    i2: ISchema,
    i3: ISchema,
    i4: ISchema,
    i5: ISchema,
    port: PortSchema,
    device: device,
    enabled: EnabledSchema,
    firewallEnabled: EnabledSchema,
  })
    .refine((data) => data.jmax > data.jmin, {
      message: 'Jmax must be > Jmin',
      path: ['jmax'],
    })
    .refine((data) => data.s1 + 56 !== data.s2, {
      message: 'S1 + 56 must not equal S2',
      path: ['s2'],
    })
    .refine(
      (data) => {
        // All magic headers must be distinct
        const headers = [data.h1, data.h2, data.h3, data.h4];
        const uniqueHeaders = new Set(headers);
        return uniqueHeaders.size === 4;
      },
      {
        message: 'All magic headers (H1-H4) must be distinct values',
        path: ['h1'],
      }
    )
);

export type InterfaceCidrUpdateType = {
  ipv4Cidr: string;
  ipv6Cidr: string;
};

export const InterfaceCidrUpdateSchema =
  schemaForType<InterfaceCidrUpdateType>()(
    z.object({
      ipv4Cidr: cidr,
      ipv6Cidr: cidr,
    })
  );

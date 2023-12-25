import { z } from "zod";

type StrictRecordModel = {
	id: string;
	created: string;
	updated: string;
	collectionId: string;
	collectionName: string;
}; // Same as pocketbase's record model, without the [key: string] : any

export const ServiceHourSchema = z.object({
	title: z.string().min(3).max(64),
	description: z.string().max(4000).optional(),
	num_of_hours: z.preprocess(
		(a) => parseInt(z.string().parse(a), 10),
		z.number().min(0.5).max(1000)
	)
});

export const CommitteesSchema = z.union([z.literal("web"), z.literal("admin"), z.literal("events"), z.literal("operations")]);

export const UserSchema = z.object({
	email: z.string().email(),
	name: z.string().min(3).max(48),
	avatar: z.string().optional(),
	four_digit_id: z.number().min(0).max(10000),
	homeroom: z.string().max(4),
	committees: CommitteesSchema.array().max(5)
});

export const EventSchema = z.object({
	name: z.string().min(3).max(64),
	description: z.string().max(4000),
	start_time: z.coerce.date(),
	end_time: z.coerce.date(),
	multiplier: z.number().min(1).max(5).default(1),
	is_out_of_school: z.boolean().default(true),
	signed_up: z.string().array()
});


export type RecievedServiceHour = z.infer<typeof ServiceHourSchema> & StrictRecordModel;
export type RecievedUser = z.infer<typeof UserSchema> & StrictRecordModel;
export type RecievedEvent = z.infer<typeof EventSchema> & StrictRecordModel;

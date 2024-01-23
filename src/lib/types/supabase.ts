export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
	public: {
		Tables: {
			lcusernames: {
				Row: {
					department: Database['public']['Enums']['Department'];
					email: string;
					username: string;
					year: Database['public']['Enums']['Year'];
				};
				Insert: {
					department: Database['public']['Enums']['Department'];
					email: string;
					username: string;
					year: Database['public']['Enums']['Year'];
				};
				Update: {
					department?: Database['public']['Enums']['Department'];
					email?: string;
					username?: string;
					year?: Database['public']['Enums']['Year'];
				};
				Relationships: [];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			Department:
				| 'CSE-AIML'
				| 'CSE-AIDS'
				| 'CSE'
				| 'CSE-CS'
				| 'CSBS'
				| 'ECE'
				| 'EEE'
				| 'BME'
				| 'MCT'
				| 'MECH'
				| 'SH'
				| 'CIVIL'
				| 'IT'
				| 'ACT'
				| 'VLSI';
			Year: '1st' | '2nd' | '3rd' | '4th';
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
}

export type Tables<
	PublicTableNameOrOptions extends
		| keyof (Database['public']['Tables'] & Database['public']['Views'])
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
				Database[PublicTableNameOrOptions['schema']]['Views'])
		: never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
			Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
			Row: infer R;
	  }
		? R
		: never
	: PublicTableNameOrOptions extends keyof (Database['public']['Tables'] &
				Database['public']['Views'])
	  ? (Database['public']['Tables'] &
				Database['public']['Views'])[PublicTableNameOrOptions] extends {
				Row: infer R;
	    }
			? R
			: never
	  : never;

export type TablesInsert<
	PublicTableNameOrOptions extends keyof Database['public']['Tables'] | { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
		: never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
			Insert: infer I;
	  }
		? I
		: never
	: PublicTableNameOrOptions extends keyof Database['public']['Tables']
	  ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
				Insert: infer I;
	    }
			? I
			: never
	  : never;

export type TablesUpdate<
	PublicTableNameOrOptions extends keyof Database['public']['Tables'] | { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
		: never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
			Update: infer U;
	  }
		? U
		: never
	: PublicTableNameOrOptions extends keyof Database['public']['Tables']
	  ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
				Update: infer U;
	    }
			? U
			: never
	  : never;

export type Enums<
	PublicEnumNameOrOptions extends keyof Database['public']['Enums'] | { schema: keyof Database },
	EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
		: never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
	? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
	: PublicEnumNameOrOptions extends keyof Database['public']['Enums']
	  ? Database['public']['Enums'][PublicEnumNameOrOptions]
	  : never;

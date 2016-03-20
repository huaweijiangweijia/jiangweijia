/*
 * Created on 2005-4-15
 *
 * Summary of regular-expression constructs										锟斤拷锟斤拷锟斤拷式锟结构锟斤拷椋?
 * Construct Matches
 *	Characters																	锟街凤拷
 *		x The character x															x   锟街凤拷 x
 *		\\ The backslash character													\\  锟斤拷斜锟斤拷
 *		\0n The character with octal value 0n (0 <= n <= 7)							\0n     十锟斤拷锟斤拷锟斤拷 (0 <= n <= 7)
 *		\0nn The character with octal value 0nn (0 <= n <= 7)						\0nn    十锟斤拷锟斤拷锟斤拷 0nn (0 <= n <= 7)
 *		\0mnn The character with octal value 0mnn (0 <= m <= 3, 0 <= n <= 7)		\0mnn   十锟斤拷锟斤拷锟斤拷 0mnn (0 <= m <= 3, 0 <= n <= 7)
 *		\xhh The character with hexadecimal value 0xhh								\xhh    十锟斤拷锟斤拷锟斤拷锟?0xhh
 *		\\uhhhh The character with hexadecimal value 0xhhhh						\\uhhhh  十锟斤拷锟斤拷锟斤拷锟?0xhhhh
 *		\t The tab character ('\u0009')												\t  锟狡憋拷锟?('\u0009')
 *		\n The newline (line feed) character ('\u000A')								\n  锟斤拷锟叫凤拷 ('\u000A')
 *		\r The carriage-return character ('\u000D')									\r  锟截筹拷锟斤拷 ('\u000D')
 *		\f The form-feed character ('\u000C')										\f  The form-feed character ('\u000C')
 *		\a The alert (bell) character ('\u0007')									\a  The alert (bell) character ('\u0007')
 *		\e The escape character ('\u001B')											\e  esc锟斤拷锟?('\u001B')
 *		\cx The control character corresponding to x								\cx     x 锟斤拷应锟侥匡拷锟狡凤拷
 *
 *	 Character classes															锟街凤拷锟斤拷
 *	 [abc] a, b, or c (simple class)								 				[abc]       a, b, 锟斤拷 c (锟斤拷锟街凤拷)
 *	 [^abc] Any character except a, b, or c (negation)								[^abc]      锟斤拷锟斤拷 a, b, 锟斤拷 c 之锟斤拷锟斤拷锟斤拷锟斤拷址锟?锟斤拷)
 *	 [a-zA-Z] a through z or A through Z, inclusive (range)							[a-zA-Z]    锟斤拷a 锟斤拷 z 锟斤拷 锟斤拷A 锟斤拷 Z锟斤拷锟斤拷锟斤拷a,z,A,Z锟斤拷(锟斤拷围)
 *	 [a-d[m-p]] a through d, or m through p: [a-dm-p] (union)						[a-d[m-p]]  锟斤拷a 锟斤拷 d, 锟斤拷 锟斤拷m 锟斤拷 p: [a-dm-p] (锟斤拷锟斤拷)
 *	 [a-z&&[def]] d, e, or f (intersection)											[a-z&&[def]]    d, e, 锟斤拷 f (锟斤拷锟斤拷)
 *	 [a-z&&[^bc]] a through z, except for b and c: [ad-z] (subtraction)				[a-z&&[^bc]]    锟斤拷a 锟斤拷 z, 锟斤拷 b 锟斤拷 c 锟斤拷锟斤拷: [ad-z] (锟接硷拷)
 *	 [a-z&&[^m-p]] a through z, and not m through p: [a-lq-z](subtraction)			[a-z&&[^m-p]]   锟斤拷a 锟斤拷 z, 锟斤拷锟斤拷锟斤拷锟斤拷 m 锟斤拷 p: [a-lq-z](锟接硷拷)
 *
 * 	Predefined character classes												预锟斤拷锟斤拷锟街凤拷锟斤拷锟斤拷
 *	. Any character (may or may not match line terminators)							 .   锟斤拷锟斤拷锟街凤拷 (也锟斤拷锟杰诧拷锟斤拷锟斤拷锟叫斤拷锟斤拷锟?
 *	\d A digit: [0-9]																 \d  锟斤拷锟斤拷: [0-9]
 *	\D A non-digit: [^0-9]															 \D  锟斤拷锟斤拷锟斤拷: [^0-9]
 *	\s A whitespace character: [ \t\n\x0B\f\r]										 \s  锟斤拷锟街凤拷: [ \t\n\x0B\f\r]
 *	\S A non-whitespace character: [^\s]											 \S  锟角匡拷锟街凤拷: [^\s]
 *	\w A word character: [a-zA-Z_0-9]												 \w  锟斤拷锟斤拷锟街凤拷: [a-zA-Z_0-9]
 *	\W A non-word character: [^\w]													 \W  锟角碉拷锟斤拷锟街凤拷: [^\w]
 *
 *	POSIX character classes (US-ASCII only)										  POSIX 锟街凤拷锟斤拷 (US-ASCII only)
 *	\p{Lower} A lower-case alphabetic character: [a-z]								\p{Lower}   小写锟斤拷母锟街凤拷: [a-z]
 *	\p{Upper} An upper-case alphabetic character:[A-Z]								\p{Upper}   锟斤拷写锟斤拷母锟街凤拷:[A-Z]
 *	\p{ASCII} All ASCII:[\x00-\x7F]													\p{ASCII}   锟斤拷锟斤拷 ASCII:[\x00-\x7F]
 *	\p{Alpha} An alphabetic character:[\p{Lower}\p{Upper}]							\p{Alpha}   锟斤拷锟斤拷锟斤拷母锟街凤拷:[\p{Lower}\p{Upper}]
 *	\p{Digit} A decimal digit: [0-9]												\p{Digit}   十锟斤拷锟斤拷锟斤拷: [0-9]
 *	\p{Alnum} An alphanumeric character:[\p{Alpha}\p{Digit}]						\p{Alnum}   锟斤拷锟斤拷锟街凤拷:[\p{Alpha}\p{Digit}]
 *	\p{Punct} Punctuation: One of !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~					\p{Punct}   锟斤拷锟斤拷锟? 锟斤拷锟斤拷 !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~
 *	\p{Graph} A visible character: [\p{Alnum}\p{Punct}]								\p{Graph}   锟斤拷锟斤拷锟街凤拷: [\p{Alnum}\p{Punct}]
 *	\p{Print} A printable character: [\p{Graph}]									\p{Print}   锟缴达拷印锟街凤拷: [\p{Graph}]
 *	\p{Blank} A space or a tab: [ \t]												\p{Blank}   锟秸革拷锟斤拷票锟斤拷: [ \t]
 *	\p{Cntrl} A control character: [\x00-\x1F\x7F]									\p{Cntrl}   锟斤拷锟斤拷锟街凤拷: [\x00-\x1F\x7F]
 *	\p{XDigit} A hexadecimal digit: [0-9a-fA-F]										\p{XDigit}  十锟斤拷锟斤拷锟斤拷锟? [0-9a-fA-F]
 *	\p{Space} A whitespace character: [ \t\n\x0B\f\r]								\p{Space}   锟斤拷锟街凤拷: [ \t\n\x0B\f\r]
 *
 *	Classes for Unicode blocks and categories									  Unicode 锟街凤拷锟斤拷
 *	\p{InGreek} A character in the Greek block (simple block)						\p{InGreek}     希锟斤拷锟斤拷锟街碉拷锟街凤拷 (simple block)
 *	\p{Lu} An uppercase letter (simple category)									\p{Lu}      锟斤拷写锟斤拷母 (simple category)
 *	\p{Sc} A currency symbol														\p{Sc}      锟斤拷锟揭凤拷锟?
 *	\P{InGreek} Any character except one in the Greek block (negation)				\P{InGreek}     锟斤拷希锟斤拷锟斤拷锟斤拷锟街凤拷锟斤拷锟斤拷锟斤拷锟斤拷址锟?(negation)
 *	[\p{L}&&[^\p{Lu}]]  Any letter except an uppercase letter (subtraction)			[\p{L}&&[^\p{Lu}]]  锟斤拷锟叫达拷锟侥革拷锟斤拷锟斤拷锟斤拷锟街凤拷 (subtraction)
 *
 *	Boundary matchers															 锟竭斤拷匹锟斤拷锟斤拷
 *	^ The beginning of a line														^   一锟叫的匡拷始
 *	$ The end of a line																$  一锟叫的斤拷锟斤拷
 *	\b A word boundary																\b  锟斤拷锟绞边斤拷
 *	\B A non-word boundary															\B  锟角碉拷锟绞边斤拷
 *	\A The beginning of the input													\A  锟斤拷锟斤拷目锟绞?
 *	\G The end of the previous match												\G  锟斤拷前匹锟斤拷慕锟斤拷锟?
 *	\Z The end of the input but for the final terminator, if any					\Z  The end of the input but for the final terminator, if any
 *	\z The end of the input															\z  锟斤拷锟斤拷慕锟斤拷锟?
 *
 *	Greedy quantifiers															Greedy quantifiers 贪锟斤拷匹锟斤拷锟斤拷锟绞ｏ拷Greedy quantifiers 锟斤拷锟斤拷锟斤拷知锟斤拷锟斤拷锟斤拷亩圆锟斤拷裕锟?
 *	X? X, once or not at all													   	X?          X锟斤拷锟斤拷锟街伙拷锟斤拷锟揭伙拷锟? (锟斤拷锟斤拷锟街凤拷"?"锟斤拷{0,1}锟斤拷锟斤拷鹊锟?
 *	X* X, zero or more times													   	X*          X锟斤拷锟斤拷锟街伙拷锟斤拷侄锟斤拷  (锟斤拷锟斤拷锟街凤拷"*"锟斤拷{0,}锟斤拷锟斤拷鹊锟?
 *	X+ X, one or more times														   	X+          X锟斤拷锟劫筹拷锟斤拷一锟斤拷      (锟斤拷锟斤拷锟街凤拷"+"锟斤拷 {1,}锟斤拷锟斤拷鹊锟?
 *	X{n} X, exactly n times														   	X{n}        X锟斤拷锟斤拷n锟斤拷
 *	X{n,} X, at least n times													   	X{n,}       X锟斤拷锟劫筹拷锟斤拷n锟斤拷
 *	X{n,m} X, at least n but not more than m times								   	X{n,m}      X锟斤拷锟劫筹拷锟斤拷n锟轿ｏ拷锟斤拷锟斤拷锟结超锟斤拷m锟斤拷
 *
 *	Reluctant quantifiers														   Reluctant quantifiers
 *	X?? X, once or not at all													   	X??         X, 锟斤拷锟斤拷锟街伙拷锟斤拷锟揭伙拷锟?
 *	X*? X, zero or more times													   	X*?         X, 锟斤拷锟斤拷锟街伙拷锟斤拷侄锟斤拷
 *	X+? X, one or more times													   	X+?         X, 锟斤拷锟劫筹拷锟斤拷一锟斤拷
 *	X{n}? X, exactly n times													   	X{n}?       X, 锟斤拷锟斤拷n锟斤拷
 *	X{n,}? X, at least n times													   	X{n,}?      X, 锟斤拷锟劫筹拷锟斤拷n锟斤拷
 *	X{n,m}? X, at least n but not more than m times								   	X{n,m}?     X, 锟斤拷锟劫筹拷锟斤拷n锟轿ｏ拷锟斤拷锟斤拷锟结超锟斤拷m锟斤拷
 *
 *	Possessive quantifiers														   	Possessive quantifiers
 *	X?+ X, once or not at all													   	X?+     X, 锟斤拷锟斤拷锟街伙拷锟斤拷锟揭伙拷锟?
 *	X*+ X, zero or more times													   	X*+         X, 锟斤拷锟斤拷锟街伙拷锟斤拷侄锟斤拷
 *	X++ X, one or more times													   	X++         X, 锟斤拷锟劫筹拷锟斤拷一锟斤拷
 *	X{n}+ X, exactly n times													   	X{n}+       X, 锟斤拷锟斤拷n锟斤拷
 *	X{n,}+ X, at least n times													   	X{n,}+      X, 锟斤拷锟劫筹拷锟斤拷n锟斤拷
 *	X{n,m}+ X, at least n but not more than m times								   	X{n,m}+     X, 锟斤拷锟劫筹拷锟斤拷n锟轿ｏ拷锟斤拷锟斤拷锟结超锟斤拷m锟斤拷
 *
 *  Logical operators                                                             锟竭硷拷锟斤拷锟斤拷锟?
 *	XY X followed by Y                                                               XY  Y锟斤拷锟斤拷X锟斤拷锟斤拷
 *	X|Y Either X or Y                                                                	X|Y     X 锟斤拷 Y
 *	(X) X, as a capturing group                                                      	(X)     X, as a capturing group
 *
 *	Back references                                                                  	锟斤拷锟斤拷锟斤拷锟斤拷
 *	\n Whatever the nth capturing group matched                                      	\n  Whatever the nth capturing group matched
 *
 *	Quotation                                                                        Quotation
 *	\ Nothing, but quotes the following character                                    	\   锟斤拷锟矫猴拷锟斤拷锟斤拷址锟?
 *	\Q Nothing, but quotes all characters until \E                                   	\Q  锟斤拷锟斤拷锟斤拷锟叫碉拷锟街凤拷直锟斤拷 \E 锟斤拷锟斤拷
 *	\E Nothing, but ends quoting started by \Q                                       	\E  锟斤拷锟斤拷锟斤拷 \Q 锟斤拷始锟斤拷锟斤拷锟斤拷
 *
 *	Special constructs (non-capturing)                                               Special constructs (non-capturing)
 *	(?:X) X, as a non-capturing group                                                	(?:X)           X, as a non-capturing group
 *	(?idmsux-idmsux)  Nothing, but turns match flags on - off                        	(?idmsux-idmsux)    匹锟斤拷锟街撅拷锟斤拷锟?
 *	(?idmsux-idmsux:X)   X, as a non-capturing group with the given flags on - off   	(?idmsux-idmsux:X)      X, as a non-capturing group with the given flags on
 *	(?=X) X, via zero-width positive lookahead	- off
 *	(?!X) X, via zero-width negative lookahead                                       	(?=X)           X, via zero-width positive lookahead
 *	(?<=X) X, via zero-width positive lookbehind                                     	(?!X)           X, via zero-width negative lookahead
 *	(?<!X) X, via zero-width negative lookbehind                                     	(?<=X)          X, via zero-width positive lookbehind
 *	(?>X) X, as an independent, non-capturing group                                  	(?<!X)          X, via zero-width negative lookbehind
 *	(?>X) X, as an independent, non-capturing group
 *
 *	Backslashes, escapes, and quoting
 *		锟斤拷斜锟斤拷锟街凤拷('\')锟斤拷锟斤拷转锟藉，锟斤拷锟斤拷锟斤拷锟斤拷谋锟斤拷卸锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷幕锟斤拷锟斤拷芑锟斤拷锟斤拷
 *		锟斤拷锟藉。锟斤拷耍锟斤拷锟斤拷式\\匹锟斤拷
 *		锟斤拷锟斤拷锟斤拷斜锟杰ｏ拷锟斤拷锟绞絓{匹锟戒单锟斤拷锟斤拷锟斤拷锟脚★拷
 *		锟斤拷锟窖凤拷斜锟杰凤拷锟斤拷没锟叫讹拷锟斤拷转锟狡癸拷锟斤拷锟斤拷魏锟斤拷锟侥革拷锟斤拷前锟芥都锟结发锟斤拷锟斤拷锟斤拷锟叫╋拷锟斤拷锟斤拷锟斤拷锟?
 *		锟斤拷锟皆猴拷锟斤拷锟斤拷锟斤拷锟绞斤拷锟斤拷锟秸癸拷锟斤拷锟叫憋拷芸锟斤拷苑锟斤拷锟斤拷魏锟?
 *		锟斤拷锟斤拷母锟斤拷锟角帮拷妫拷锟绞癸拷锟矫伙拷卸锟斤拷锟阶拷骞癸拷锟揭诧拷锟斤拷岱拷锟斤拷锟斤拷
 *		锟斤拷java锟斤拷锟皆规范锟斤拷指锟斤拷锟斤拷锟斤拷java锟斤拷锟斤拷锟斤拷锟皆凤拷锟叫的凤拷斜锟斤拷锟角憋拷要锟侥ｏ拷锟斤拷锟斤拷锟斤拷锟斤拷Unicode转
 *		锟藉，锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷通锟斤拷锟街凤拷转锟藉。锟斤拷耍锟?
 *		为锟剿憋拷锟斤拷锟斤拷锟斤拷锟斤拷式锟斤拷锟斤拷锟斤拷锟皆ｏ拷锟斤拷java锟街凤拷锟斤拷要写锟斤拷锟斤拷锟斤拷斜锟杰★拷锟斤拷锟界，锟斤拷锟斤拷锟斤拷锟斤拷式
 *		锟斤拷锟街凤拷'\b'锟斤拷锟斤拷烁锟?\\b'锟斤拷锟?锟绞边界。'\(hello\)'锟斤拷锟斤拷效锟侥ｏ拷锟斤拷锟揭伙拷锟斤拷锟斤拷锟斤拷
 *		时锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟?
 *		'\\(hello\\)'锟斤拷匹锟斤拷(hello)锟斤拷
 *
 *	Character Classes
 *
 *	     锟街凤拷锟斤拷锟斤拷猿锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷址锟斤拷锟斤拷诓锟斤拷锟斤拷锟斤拷铱锟斤拷锟斤拷刹锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟?&&)锟斤拷伞锟斤拷锟斤拷锟斤拷锟?
 *		锟斤拷锟斤拷锟斤拷牵锟斤拷锟斤拷械锟斤拷锟斤拷锟斤拷址锟较讹拷锟斤拷锟斤拷锟斤拷锟斤拷锟叫诧拷锟斤拷锟斤拷锟斤拷锟斤拷锟劫筹拷锟街癸拷一锟轿★拷
 *		锟斤拷锟斤拷锟侥斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷同时锟斤拷锟街碉拷锟斤拷锟斤拷锟街凤拷
 *
 *		锟街凤拷锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟饺硷拷锟斤拷锟铰ｏ拷锟斤拷锟接高碉拷锟酵ｏ拷
 *			1     锟斤拷锟斤拷转锟斤拷      \x
 *			2     锟斤拷锟斤拷      [...]
 *			3     锟斤拷围      a-z
 *			4     锟斤拷锟斤拷      [a-e][i-u]
 *			5     锟斤拷锟斤拷      [a-z&&[aeiou]]
 *
 *			锟斤拷注锟斤拷锟斤拷锟斤拷址锟斤拷锟斤拷锟斤拷效锟街凤拷锟斤拷锟界，锟斤拷锟街凤拷锟斤拷锟叫ｏ拷锟斤拷锟斤拷锟斤拷式.失去锟斤拷锟斤拷锟斤拷乇锟斤拷锟?
 *			锟斤拷锟斤拷-锟斤拷锟斤拷锟皆拷址锟侥凤拷围指示锟斤拷
 *
 *		Line terminators
 *
 *			锟叫斤拷锟斤拷锟斤拷锟揭伙拷锟斤拷锟斤拷锟斤拷锟斤拷址锟斤拷锟斤拷校锟斤拷锟斤拷锟斤拷锟绞讹拷锟斤拷锟斤拷址锟斤拷锟斤拷械锟揭伙拷械慕锟斤拷锟斤拷锟斤拷卸锟斤拷锟斤拷锟轿?
 *			锟斤拷锟叫斤拷锟斤拷锟?
 *
 *			锟斤拷锟叫凤拷      ('\n'),
 *			锟截筹拷锟斤拷锟叫凤拷  ("\r\n"),
 *			锟截筹拷锟斤拷      ('\r'),
 *			锟斤拷一锟斤拷      ('\u0085'),
 *			锟叫分革拷锟斤拷    ('\u2028'), 锟斤拷
 *			锟轿分革拷锟斤拷    ('\u2029).
 *
 *			锟斤拷锟斤拷锟斤拷 UNIX_LINES 模式锟斤拷唯一锟斤拷锟叫斤拷锟斤拷锟斤拷锟角伙拷锟叫凤拷
 *			锟斤拷锟斤拷锟街革拷锟斤拷锟?DOTALL 锟斤拷志锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷式.匹锟斤拷锟轿猴拷锟街凤拷只锟斤拷锟叫斤拷锟斤拷锟斤拷锟解。
 *			确省锟斤拷锟绞憋拷锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷校锟斤拷锟斤拷锟斤拷锟绞絕锟斤拷$锟斤拷锟斤拷锟叫斤拷锟斤拷锟街黄ワ拷淇硷拷徒锟斤拷锟?
 *			锟斤拷锟斤拷锟斤拷 MULTILINE 模式锟斤拷锟斤拷^匹锟斤拷锟斤拷锟斤拷目锟绞硷拷锟斤拷锟斤拷锟斤拷薪锟斤拷锟斤拷之锟襟，筹拷锟斤拷锟斤拷锟斤拷锟斤拷锟?
 *			锟侥斤拷锟斤拷
 *			锟斤拷MULTILINE 模式锟铰ｏ拷$匹锟斤拷锟斤拷锟斤拷锟叫斤拷锟斤拷锟街帮拷锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷慕锟斤拷锟?
 *
 *		Groups and capturing
 *
 *			锟斤拷锟介捕锟斤拷通锟斤拷锟斤拷锟斤拷业锟剿筹拷颍锟斤拷锟斤拷锟脚碉拷锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟界，锟节憋拷锟绞?(A)(B(C)))锟斤拷
 *			锟斤拷锟斤拷锟侥革拷锟介：
 *			1     ((A)(B(C)))
 *			2     (A)
 *			3     (B(C))
 *			4     (C)
 *
 *			0锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷式锟斤拷
 *			锟斤拷锟介捕锟斤拷之锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟轿拷锟狡ワ拷锟斤拷锟斤拷校锟斤拷锟斤拷锟斤拷锟斤拷械锟矫恳伙拷锟斤拷锟斤拷锟斤拷匹锟斤拷锟斤拷锟斤拷锟?
 *			锟叫讹拷锟结被锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷通锟斤拷锟斤拷锟斤拷锟斤拷茫锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟叫匡拷锟斤拷锟节猴拷锟斤拷谋锟斤拷式锟叫憋拷锟劫达拷使锟斤拷
 *			锟斤拷
 *			锟斤拷锟揭ｏ拷锟斤拷匹锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷院蠡箍锟斤拷锟酵拷锟狡ワ拷锟斤拷锟斤拷锟斤拷锟斤拷业锟斤拷锟?
 *			锟斤拷一锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷谋锟斤拷锟斤拷竦降锟斤拷锟斤拷锟酵拷锟斤拷潜锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷匹锟斤拷亩锟斤拷械锟斤拷佣锟?
 *			锟叫★拷锟斤拷锟揭伙拷锟斤拷锟斤拷楸伙拷诙锟斤拷锟斤拷锟街碉拷锟斤拷锟绞故э拷埽锟斤拷锟斤拷锟斤拷一锟轿憋拷锟斤拷锟斤拷锟街狄诧拷岜伙拷锟斤拷锟斤拷锟斤拷锟斤拷锟?
 *			锟斤拷锟界，
 *			锟斤拷锟绞?a(b)?)+匹锟斤拷"aba"锟斤拷"b"锟斤拷为锟接凤拷锟介。锟节匡拷始匹锟斤拷锟绞憋拷锟斤拷锟角帮拷锟斤拷锟斤拷锟斤拷锟斤拷锟诫都
 *			锟斤拷锟斤拷锟斤拷锟?
 *			锟斤拷(?锟斤拷始锟侥凤拷锟斤拷锟斤拷锟斤拷全锟侥ｏ拷锟斤拷锟借捕锟斤拷姆锟斤拷椴伙拷岵讹拷锟斤拷魏锟斤拷谋锟斤拷锟揭诧拷锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟?
 *
 *		Unicode support
 *
 *			Unicode Technical Report #18: Unicode Regular Expression Guidelines通锟斤拷锟斤拷微锟斤拷锟斤法锟侥憋拷实锟斤拷锟剿革拷锟斤拷锟轿碉拷支锟街★拷
 *			锟斤拷java锟斤拷锟斤拷锟叫ｏ拷锟斤拷\u2014 锟斤拷锟斤拷锟阶拷锟斤拷锟斤拷校锟絡ava锟斤拷锟皆规范锟叫ｏ拷3.3锟结供锟剿达拷锟?锟斤拷
 *			锟斤拷
 *			为锟剿憋拷锟斤拷使锟矫达拷锟侥硷拷锟斤拷锟斤拷潭锟饺★拷锟絬nicode转锟斤拷锟街凤拷锟斤拷锟斤拷锟斤拷式锟斤拷锟斤拷锟斤拷也直锟斤拷实锟斤拷锟斤拷锟斤拷
 *			锟斤拷转锟狡★拷锟斤拷耍锟斤拷址锟?\u2014"锟斤拷"\\u2014"锟斤拷然锟斤拷锟斤拷龋锟斤拷锟斤拷潜锟斤拷锟斤拷同一锟斤拷模式锟斤拷锟斤拷锟斤拷
 *			匹锟斤拷
 *			十锟斤拷锟斤拷锟斤拷锟?x2014锟斤拷
 *
 *			锟斤拷Perl锟叫ｏ拷unicode锟斤拷头锟斤拷啾恍达拷锟絓p,\P锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟絧rop锟斤拷锟皆ｏ拷\p{prop}锟斤拷锟斤拷匹锟戒，
 *			锟斤拷\P{prop}锟斤拷锟斤拷锟斤拷匹锟戒。锟斤拷通锟斤拷前缀In指锟斤拷锟斤拷锟斤拷为锟斤拷nMongolian之锟叫★拷
 *			锟斤拷锟斤拷通锟斤拷锟斤拷锟斤拷锟角白篒s指锟斤拷锟斤拷 \p{L} 锟斤拷 \p{IsL} 锟斤拷锟斤拷锟斤拷 Unicode 锟斤拷母锟斤拷锟斤拷头锟斤拷锟斤拷锟斤拷
 *			锟斤拷使锟斤拷锟斤拷锟街凤拷锟斤拷锟斤拷诓锟斤拷锟斤拷獠匡拷锟?
 *
 *			The Unicode Standard, Version 3.0指锟斤拷锟斤拷支锟街的匡拷头锟斤拷唷ｏ拷锟斤拷锟斤拷锟斤拷锟节碉拷14锟铰猴拷 Unicode Character
 *			Database锟叫碉拷 Blocks-3.txt 锟侥硷拷锟斤拷锟藉，
 *			锟斤拷锟秸革拷锟睫筹拷锟剿★拷锟斤拷锟斤拷Basic Latin"锟斤拷锟斤拷锟? "BasicLatin"锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷直锟斤拷锟斤拷锟斤拷锟?8页
 *			锟斤拷锟斤拷4-5锟斤拷
 *
 */
package com.tl.common.util;

import java.util.*;

import org.apache.oro.text.regex.*;

/**
 * 锟斤拷锟斤拷: 使锟斤拷锟斤拷锟斤拷锟斤拷式锟斤拷证锟斤拷莼锟斤拷锟饺★拷锟斤拷,锟斤拷锟叫的凤拷锟斤拷全为锟斤拷态锟斤拷<br/> 锟斤拷锟斤拷锟斤，锟揭斤拷锟斤拷锟斤拷喽拷锟斤拷锟斤拷一锟斤拷锟斤拷锟斤拷 锟斤拷锟斤拷锟斤拷只锟斤拷static
 * 锟斤拷锟斤拷锟角诧拷new去锟斤拷锟斤拷模锟揭诧拷锟斤拷貌锟斤拷锟斤拷锟斤拷锟斤拷耍锟?br/> 锟斤拷锟斤拷为锟斤拷一锟斤拷 regexpHash(HashMap实锟斤拷)锟斤拷为锟剿匡拷锟皆讹拷态
 * 锟斤拷锟斤拷锟斤拷锟斤拷式锟斤拷锟斤拷知锟斤拷锟角诧拷锟斤拷锟斤拷锟教拷锟斤拷锟?) 锟斤拷锟斤拷
 * 
 * <pre>
 * 锟斤拷要锟斤拷锟斤拷:1. isHardRegexpValidate(String source, String regexp)
 *             锟斤拷执锟叫⌒达拷锟斤拷械锟斤拷锟斤拷锟斤拷式锟斤拷锟斤拷
 *          2. isSoftRegexpValidate(String source, String regexp)
 *             锟斤拷锟斤拷执锟叫⌒达拷锟斤拷锟斤拷锟斤拷式锟斤拷锟斤拷
 *          3. getHardRegexpMatchResult(String source, String regexp)
 *             锟斤拷锟斤拷锟斤拷要锟斤拷锟斤拷锟斤拷锟斤拷(锟斤拷小写锟斤拷锟叫碉拷锟斤拷锟斤拷锟绞斤拷锟斤拷锟?
 *          4. getSoftRegexpMatchResult(String source, String regexp)
 *             锟斤拷锟斤拷锟斤拷要锟斤拷锟斤拷锟斤拷锟斤拷(锟斤拷锟斤拷执锟叫⌒达拷锟斤拷锟斤拷锟斤拷式锟斤拷锟斤拷)
 *          5  getHardRegexpArray(String source, String regexp)
 *             锟斤拷锟斤拷锟斤拷要锟斤拷锟斤拷锟斤拷锟斤拷(锟斤拷小写锟斤拷锟叫碉拷锟斤拷锟斤拷锟绞斤拷锟斤拷锟?
 *          6. getSoftRegexpMatchResult(String source, String regexp)
 *             锟斤拷锟斤拷锟斤拷要锟斤拷锟斤拷锟斤拷锟斤拷(锟斤拷锟斤拷执锟叫⌒达拷锟斤拷锟斤拷锟斤拷式锟斤拷锟斤拷)
 *          7.  getBetweenSeparatorStr(final String originStr,final char leftSeparator,final char rightSeparator)
 *             锟矫碉拷指锟斤拷锟街革拷锟斤拷锟叫硷拷锟斤拷址锟侥硷拷锟斤拷
 *             
 * 锟斤拷锟斤拷锟绞侥壳帮拷锟?25锟斤拷
 *           1.匹锟斤拷图锟斤拷              icon_regexp;
 *  2 匹锟斤拷email锟斤拷址         email_regexp;
 *  3 匹锟斤拷匹锟戒并锟斤拷取url      url_regexp;
 *  4 匹锟戒并锟斤拷取http        http_regexp;
 *  5.匹锟斤拷锟斤拷锟斤拷              date_regexp;
 *  6 匹锟斤拷缁?             phone_regexp;
 *  7 匹锟斤拷锟斤拷锟街?          ID_card_regexp;
 *  8 匹锟斤拷锟绞憋拷锟斤拷锟?         ZIP_regexp
 *  9. 锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟街凤拷锟狡ワ拷锟?(锟街凤拷锟叫诧拷锟斤拷锟斤拷锟斤拷锟?锟斤拷学锟轿凤拷锟斤拷&circ; 锟斤拷锟斤拷锟? 双锟斤拷锟?quot; 锟街猴拷; 锟斤拷锟斤拷, 帽锟斤拷:
 *  锟斤拷学锟斤拷锟斤拷- 锟揭硷拷锟斤拷锟斤拷&gt; 锟斤拷锟斤拷锟斤拷锟?lt;  锟斤拷斜锟斤拷\ 锟斤拷锟秸革拷,锟狡憋拷锟?锟截筹拷锟斤拷锟?
 *  non_special_char_regexp;
 *  10 匹锟斤拷歉锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟?+ 0)           non_negative_integers_regexp;
 *  11  匹锟戒不锟斤拷锟斤拷锟斤拷姆歉锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟?&gt; 0)    non_zero_negative_integers_regexp;
 *  12 匹锟斤拷锟斤拷锟斤拷锟斤拷             positive_integer_regexp;
 *  13  匹锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟?+ 0锟斤拷         non_positive_integers_regexp;
 *  14 匹锟戒负锟斤拷锟斤拷            negative_integers_regexp;
 *  15. 匹锟斤拷锟斤拷锟斤拷             integer_regexp;
 *  16 匹锟斤拷歉锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷 + 0锟斤拷           non_negative_rational_numbers_regexp
 *  17. 匹锟斤拷锟斤拷锟斤拷锟?             positive_rational_numbers_regexp
 *  18 匹锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟?+ 0锟斤拷   non_positive_rational_numbers_regexp;
 *  19 匹锟戒负锟斤拷锟斤拷锟斤拷            negative_rational_numbers_regexp;
 *  20 .匹锟戒浮锟斤拷锟斤拷             rational_numbers_regexp;
 *  21. 匹锟斤拷锟斤拷26锟斤拷英锟斤拷锟斤拷母锟斤拷傻锟斤拷址锟?         letter_regexp;
 *  22. 匹锟斤拷锟斤拷26锟斤拷英锟斤拷锟斤拷母锟侥达拷写锟斤拷傻锟斤拷址锟?    upward_letter_regexp;
 *  23 匹锟斤拷锟斤拷26锟斤拷英锟斤拷锟斤拷母锟斤拷小写锟斤拷傻锟斤拷址锟?     lower_letter_regexp
 *  24 匹锟斤拷锟斤拷锟斤拷锟街猴拷26锟斤拷英锟斤拷锟斤拷母锟斤拷傻锟斤拷址锟?     letter_number_regexp;
 *  25  匹锟斤拷锟斤拷锟斤拷锟街★拷26锟斤拷英锟斤拷锟斤拷母锟斤拷锟斤拷锟铰伙拷锟斤拷锟斤拷傻锟斤拷址锟?
 *  letter_number_underline_regexp;
 * </pre>
 * 
 */
@SuppressWarnings("unchecked")
public final class Regexp {

	/** 锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟接︼拷指锟斤拷锟?*/
	static final Set SEPARATOR_SET = new TreeSet();
	{
		SEPARATOR_SET.add("(");
		SEPARATOR_SET.add(")");
		SEPARATOR_SET.add("[");
		SEPARATOR_SET.add("]");
		SEPARATOR_SET.add("{");
		SEPARATOR_SET.add("}");
		SEPARATOR_SET.add("<");
		SEPARATOR_SET.add(">");
	}

	/** 锟斤拷鸥锟斤拷锟斤拷锟斤拷锟斤拷式(锟斤拷key->value锟斤拷锟斤拷式) */
	public static HashMap regexpHash = new HashMap();

	/** 锟斤拷鸥锟斤拷锟斤拷锟斤拷锟斤拷式(锟斤拷key->value锟斤拷锟斤拷式) */
	public static List matchingResultList = new ArrayList();

	private Regexp() {
	}

	/**
	 * 锟斤拷锟斤拷 Regexp 实锟斤拷
	 * 
	 * @return
	 */
	public static Regexp getInstance() {
		return new Regexp();
	}

	/**
	 * 匹锟斤拷图锟斤拷 <br>
	 * 
	 * 锟斤拷式: /锟斤拷锟铰凤拷锟?锟侥硷拷锟斤拷.锟斤拷缀 (锟斤拷缀为gif,dmp,png)
	 * 
	 * 匹锟斤拷 : /forum/head_icon/admini2005111_ff.gif 锟斤拷 admini2005111.dmp<br>
	 * 
	 * 锟斤拷匹锟斤拷: c:/admins4512.gif
	 * 
	 */
	public static final String icon_regexp = "^(/{0,1}\\w){1,}\\.(gif|dmp|png|jpg)$|^\\w{1,}\\.(gif|dmp|png|jpg)$";
	/**
	 * 匹锟斤拷email锟斤拷址 <br>
	 * 
	 * 锟斤拷式: XXX@XXX.XXX.XX
	 * 
	 * 匹锟斤拷 : foo@bar.com 锟斤拷 foobar@foobar.com.au <br>
	 * 
	 * 锟斤拷匹锟斤拷: foo@bar 锟斤拷 $$$@bar.com
	 * 
	 */
	public static final String email_regexp = "(?:\\w[-._\\w]*\\w@\\w[-._\\w]*\\w\\.\\w{2,3}$)";

	/**
	 * 匹锟斤拷匹锟戒并锟斤拷取url <br>
	 * 
	 * 锟斤拷式: XXXX://XXX.XXX.XXX.XX/XXX.XXX?XXX=XXX
	 * 
	 * 匹锟斤拷 : http://www.suncer.com 锟斤拷news://www<br>
	 * 
	 * 锟斤拷取(MatchResult matchResult=matcher.getMatch()): matchResult.group(0)=
	 * http://www.suncer.com:8080/index.html?login=true matchResult.group(1) =
	 * http matchResult.group(2) = www.suncer.com matchResult.group(3) = :8080
	 * matchResult.group(4) = /index.html?login=true
	 * 
	 * 锟斤拷匹锟斤拷: c:\window
	 * 
	 */
	public static final String url_regexp = "(\\w+)://([^/:]+)(:\\d*)?([^#\\s]*)";

	/**
	 * 匹锟戒并锟斤拷取http <br>
	 * 
	 * 锟斤拷式: http://XXX.XXX.XXX.XX/XXX.XXX?XXX=XXX 锟斤拷 ftp://XXX.XXX.XXX 锟斤拷
	 * https://XXX
	 * 
	 * 匹锟斤拷 : http://www.suncer.com:8080/index.html?login=true<br>
	 * 
	 * 锟斤拷取(MatchResult matchResult=matcher.getMatch()): matchResult.group(0)=
	 * http://www.suncer.com:8080/index.html?login=true matchResult.group(1) =
	 * http matchResult.group(2) = www.suncer.com matchResult.group(3) = :8080
	 * matchResult.group(4) = /index.html?login=true
	 * 
	 * 锟斤拷匹锟斤拷: news://www
	 * 
	 */
	public static final String http_regexp = "(http|https|ftp)://([^/:]+)(:\\d*)?([^#\\s]*)";

	/**
	 * 匹锟斤拷锟斤拷锟斤拷 <br>
	 * 
	 * 锟斤拷式(锟斤拷位锟斤拷为0): XXXX-XX-XX 锟斤拷 XXXX XX XX 锟斤拷 XXXX-X-X <br>
	 * 
	 * 锟斤拷围:1900--2099 <br>
	 * 
	 * 匹锟斤拷 : 2005-04-04 <br>
	 * 
	 * 锟斤拷匹锟斤拷: 01-01-01
	 * 
	 */
	public static final String date_regexp = "^((((19){1}|(20){1})d{2})|d{2})[-\\s]{1}[01]{1}d{1}[-\\s]{1}[0-3]{1}d{1}$";// 匹锟斤拷锟斤拷锟斤拷

	/**
	 * 匹锟斤拷缁?<br>
	 * 
	 * 锟斤拷式为: 0XXX-XXXXXX(10-13位锟斤拷位锟斤拷锟斤拷为0) 锟斤拷0XXX XXXXXXX(10-13位锟斤拷位锟斤拷锟斤拷为0) 锟斤拷 <br>
	 * (0XXX)XXXXXXXX(11-14位锟斤拷位锟斤拷锟斤拷为0) 锟斤拷 XXXXXXXX(6-8位锟斤拷位锟斤拷为0) 锟斤拷
	 * XXXXXXXXXXX(11位锟斤拷位锟斤拷为0) <br>
	 * 
	 * 匹锟斤拷 : 0371-123456 锟斤拷 (0371)1234567 锟斤拷 (0371)12345678 锟斤拷 010-123456 锟斤拷
	 * 010-12345678 锟斤拷 12345678912 <br>
	 * 
	 * 锟斤拷匹锟斤拷: 1111-134355 锟斤拷 0123456789
	 * 
	 */
	public static final String phone_regexp = "^(?:0[0-9]{2,3}[-\\s]{1}|\\(0[0-9]{2,4}\\))[0-9]{6,8}$|^[1-9]{1}[0-9]{5,7}$|^[1-9]{1}[0-9]{10}$";

	/**
	 * 匹锟斤拷锟斤拷锟街?<br>
	 * 
	 * 锟斤拷式为: XXXXXXXXXX(10位) 锟斤拷 XXXXXXXXXXXXX(13位) 锟斤拷 XXXXXXXXXXXXXXX(15位) 锟斤拷
	 * XXXXXXXXXXXXXXXXXX(18位) <br>
	 * 
	 * 匹锟斤拷 : 0123456789123 <br>
	 * 
	 * 锟斤拷匹锟斤拷: 0123456
	 * 
	 */
	public static final String ID_card_regexp = "^\\d{10}|\\d{13}|\\d{15}|\\d{18}$";

	/**
	 * 匹锟斤拷锟绞憋拷锟斤拷锟?<br>
	 * 
	 * 锟斤拷式为: XXXXXX(6位) <br>
	 * 
	 * 匹锟斤拷 : 012345 <br>
	 * 
	 * 锟斤拷匹锟斤拷: 0123456
	 * 
	 */
	public static final String ZIP_regexp = "^[0-9]{6}$";// 匹锟斤拷锟绞憋拷锟斤拷锟?

	/**
	 * 锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟街凤拷锟狡ワ拷锟?(锟街凤拷锟叫诧拷锟斤拷锟斤拷锟斤拷锟?锟斤拷学锟轿凤拷锟斤拷^ 锟斤拷锟斤拷锟? 双锟斤拷锟? 锟街猴拷; 锟斤拷锟斤拷, 帽锟斤拷: 锟斤拷学锟斤拷锟斤拷- 锟揭硷拷锟斤拷锟斤拷> 锟斤拷锟斤拷锟斤拷锟?
	 * 锟斤拷斜锟斤拷\ 锟斤拷锟秸革拷,锟狡憋拷锟?锟截筹拷锟斤拷锟?)<br>
	 * 
	 * 锟斤拷式为: x 锟斤拷 一锟斤拷一锟较碉拷锟街凤拷 <br>
	 * 
	 * 匹锟斤拷 : 012345 <br>
	 * 
	 * 锟斤拷匹锟斤拷: 0123456
	 * 
	 */
	public static final String non_special_char_regexp = "^[^'\"\\;,:-<>\\s].+$";// 匹锟斤拷锟绞憋拷锟斤拷锟?

	/**
	 * 匹锟斤拷歉锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟?+ 0)
	 */
	public static final String non_negative_integers_regexp = "^\\d+$";

	/**
	 * 匹锟戒不锟斤拷锟斤拷锟斤拷姆歉锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟?> 0)
	 */
	public static final String non_zero_negative_integers_regexp = "^[1-9]+\\d*$";

	/**
	 * 
	 * 匹锟斤拷锟斤拷锟斤拷锟斤拷
	 * 
	 */
	public static final String positive_integer_regexp = "^[0-9]*[1-9][0-9]*$";

	/**
	 * 
	 * 匹锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟?+ 0锟斤拷
	 * 
	 */
	public static final String non_positive_integers_regexp = "^((-\\d+)|(0+))$";

	/**
	 * 
	 * 匹锟戒负锟斤拷锟斤拷
	 * 
	 */
	public static final String negative_integers_regexp = "^-[0-9]*[1-9][0-9]*$";

	/**
	 * 
	 * 匹锟斤拷锟斤拷锟斤拷
	 * 
	 */
	public static final String integer_regexp = "^-?\\d+$";

	/**
	 * 
	 * 匹锟斤拷歉锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷 + 0锟斤拷
	 * 
	 */
	public static final String non_negative_rational_numbers_regexp = "^\\d+(\\.\\d+)?$";

	/**
	 * 
	 * 匹锟斤拷锟斤拷锟斤拷锟?
	 * 
	 */
	public static final String positive_rational_numbers_regexp = "^(([0-9]+\\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\\.[0-9]+)|([0-9]*[1-9][0-9]*))$";

	/**
	 * 
	 * 匹锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟?+ 0锟斤拷
	 * 
	 */
	public static final String non_positive_rational_numbers_regexp = "^((-\\d+(\\.\\d+)?)|(0+(\\.0+)?))$";

	/**
	 * 
	 * 匹锟戒负锟斤拷锟斤拷锟斤拷
	 * 
	 */
	public static final String negative_rational_numbers_regexp = "^(-(([0-9]+\\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\\.[0-9]+)|([0-9]*[1-9][0-9]*)))$";

	/**
	 * 
	 * 匹锟戒浮锟斤拷锟斤拷
	 * 
	 */
	public static final String rational_numbers_regexp = "^(-?\\d+)(\\.\\d+)?$";

	/**
	 * 
	 * 匹锟斤拷锟斤拷26锟斤拷英锟斤拷锟斤拷母锟斤拷傻锟斤拷址锟?
	 * 
	 */
	public static final String letter_regexp = "^[A-Za-z]+$";

	/**
	 * 
	 * 匹锟斤拷锟斤拷26锟斤拷英锟斤拷锟斤拷母锟侥达拷写锟斤拷傻锟斤拷址锟?
	 * 
	 */
	public static final String upward_letter_regexp = "^[A-Z]+$";

	/**
	 * 
	 * 匹锟斤拷锟斤拷26锟斤拷英锟斤拷锟斤拷母锟斤拷小写锟斤拷傻锟斤拷址锟?
	 * 
	 */
	public static final String lower_letter_regexp = "^[a-z]+$";

	/**
	 * 
	 * 匹锟斤拷锟斤拷锟斤拷锟街猴拷26锟斤拷英锟斤拷锟斤拷母锟斤拷傻锟斤拷址锟?
	 * 
	 */
	public static final String letter_number_regexp = "^[A-Za-z0-9]+$";

	/**
	 * 
	 * 匹锟斤拷锟斤拷锟斤拷锟街★拷26锟斤拷英锟斤拷锟斤拷母锟斤拷锟斤拷锟铰伙拷锟斤拷锟斤拷傻锟斤拷址锟?
	 * 
	 */
	public static final String letter_number_underline_regexp = "^\\w+$";

	/**
	 * 锟斤拷锟斤拷锟斤拷锟斤拷式 (锟斤拷key->value锟斤拷锟斤拷式锟芥储)
	 * 
	 * @param regexpName
	 *            锟斤拷锟斤拷锟斤拷锟绞斤拷锟斤拷 `
	 * @param regexp
	 *            锟斤拷锟斤拷锟斤拷锟绞斤拷锟斤拷锟?
	 */
	public void putRegexpHash(String regexpName, String regexp) {
		regexpHash.put(regexpName, regexp);
	}

	/**
	 * 锟矫碉拷锟斤拷锟斤拷锟绞斤拷锟斤拷锟?(通锟斤拷key锟斤拷锟斤拷取锟斤拷value[锟斤拷锟斤拷锟绞斤拷锟斤拷锟絔)
	 * 
	 * @param regexpName
	 *            锟斤拷锟斤拷锟绞斤拷锟斤拷
	 * 
	 * @return 锟斤拷锟斤拷锟绞斤拷锟斤拷锟?
	 */
	public String getRegexpHash(String regexpName) {
		if (regexpHash.get(regexpName) != null) {
			return ((String) regexpHash.get(regexpName));
		} else {
			//System.out.println("锟斤拷regexpHash锟斤拷没锟叫达拷锟斤拷锟斤拷锟绞?);
			return "";
		}
	}

	/**
	 * 锟斤拷锟斤拷锟斤拷锟斤拷式锟斤拷诺锟皆?
	 */
	public void clearRegexpHash() {
		regexpHash.clear();
		return;
	}

	/**
	 * 锟斤拷小写锟斤拷锟叫碉拷锟斤拷锟斤拷锟绞斤拷锟斤拷锟?
	 * 
	 * @param source
	 *            锟斤拷锟斤拷锟皆达拷址锟?
	 * 
	 * @param regexp
	 *            锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷式
	 * 
	 * @return 锟斤拷锟皆达拷址锟斤拷锟揭拷蠓祷锟斤拷锟?锟斤拷锟津返回硷拷 锟斤拷:
	 *         Regexp.isHardRegexpValidate("ygj@suncer.com.cn",email_regexp) 锟斤拷锟斤拷锟斤拷
	 */
	public static boolean isHardRegexpValidate(String source, String regexp) {
		try {
			// 锟斤拷锟节讹拷锟斤拷锟斤拷锟斤拷锟绞斤拷锟斤拷锟侥ｏ拷锟斤拷锟斤拷锟?
			PatternCompiler compiler = new Perl5Compiler();

			// 锟斤拷锟斤拷锟绞斤拷冉锟斤拷锟斤拷锟斤拷锟斤拷
			PatternMatcher matcher = new Perl5Matcher();

			// 实锟斤拷锟叫★拷锟叫⌒达拷锟斤拷械锟斤拷锟斤拷锟斤拷式模锟斤拷
			Pattern hardPattern = compiler.compile(regexp);

			// 锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷
			return matcher.contains(source, hardPattern);

		} catch (MalformedPatternException e) {
			e.printStackTrace();
		}
		return false;
	}

	/**
	 * 锟斤拷锟斤拷执锟叫⌒达拷锟斤拷锟斤拷锟斤拷式锟斤拷锟斤拷
	 * 
	 * @param source
	 *            锟斤拷锟斤拷锟皆达拷址锟?
	 * 
	 * @param regexp
	 *            锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷式
	 * 
	 * @return 锟斤拷锟皆达拷址锟斤拷锟揭拷蠓祷锟斤拷锟?锟斤拷锟津返回硷拷
	 *         Regexp.isHardRegexpValidate("ygj@suncer.com.cn",email_regexp) 锟斤拷锟斤拷锟斤拷
	 */
	public static boolean isSoftRegexpValidate(String source, String regexp) {
		try {
			// 锟斤拷锟节讹拷锟斤拷锟斤拷锟斤拷锟绞斤拷锟斤拷锟侥ｏ拷锟斤拷锟斤拷锟?
			PatternCompiler compiler = new Perl5Compiler();

			// 锟斤拷锟斤拷锟绞斤拷冉锟斤拷锟斤拷锟斤拷锟斤拷
			PatternMatcher matcher = new Perl5Matcher();

			// 实锟斤拷锟斤拷执锟叫⌒达拷锟斤拷锟斤拷锟斤拷式模锟斤拷
			Pattern softPattern = compiler.compile(regexp,
					Perl5Compiler.CASE_INSENSITIVE_MASK);

			// 锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷证值
			return matcher.contains(source, softPattern);

		} catch (MalformedPatternException e) {
			e.printStackTrace();
		}
		return false;
	}

	/**
	 * 锟斤拷锟斤拷锟斤拷要锟斤拷锟斤拷锟斤拷锟斤拷(锟斤拷小写锟斤拷锟叫碉拷锟斤拷锟斤拷锟绞斤拷锟斤拷锟?
	 * 
	 * @param source
	 *            锟斤拷锟斤拷锟皆达拷址锟?
	 * 
	 * @param regexp
	 *            锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷式
	 * 
	 * @return 锟斤拷锟皆达拷址锟斤拷锟揭拷蠓祷锟斤拷锟揭拷锟斤拷锟斤拷锟斤拷锟?锟斤拷锟津返伙拷 "null"锟截硷拷锟斤拷 <br>
	 *         锟斤拷 : MatchResult matchResult =
	 *         getHardRegexpMatchResult("http://www.suncer.com:8080/index.html?login=true",Regexp.url_regexp)
	 *         锟矫碉拷取锟斤拷锟斤拷匹锟斤拷值为 matchResult.group(0)=
	 *         http://www.suncer.com:8080/index.html?login=true
	 *         matchResult.group(1) = http matchResult.group(2) = www.suncer.com
	 *         matchResult.group(3) = :8080 matchResult.group(4) =
	 *         /index.html?login=true
	 * 
	 */
	public static MatchResult getHardRegexpMatchResult(String source,
			String regexp) {
		try {
			// 锟斤拷锟节讹拷锟斤拷锟斤拷锟斤拷锟绞斤拷锟斤拷锟侥ｏ拷锟斤拷锟斤拷锟?
			PatternCompiler compiler = new Perl5Compiler();

			// 锟斤拷锟斤拷锟绞斤拷冉锟斤拷锟斤拷锟斤拷锟斤拷
			PatternMatcher matcher = new Perl5Matcher();

			// 实锟斤拷锟叫★拷锟叫⌒达拷锟斤拷械锟斤拷锟斤拷锟斤拷式模锟斤拷
			Pattern hardPattern = compiler.compile(regexp);

			// 锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟饺?锟斤拷锟斤拷取锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷
			if (matcher.contains(source, hardPattern)) {
				// MatchResult result=matcher.getMatch();
				return matcher.getMatch();
			}
		} catch (MalformedPatternException e) {
			e.printStackTrace();
		}
		return null;
	}

	/**
	 * 锟斤拷锟斤拷锟斤拷要锟斤拷锟斤拷锟斤拷锟斤拷(锟斤拷锟斤拷执锟叫⌒达拷锟斤拷锟斤拷锟斤拷式锟斤拷锟斤拷)
	 * 
	 * @param source
	 *            锟斤拷锟斤拷锟皆达拷址锟?
	 * 
	 * @param regexp
	 *            锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷式
	 * 
	 * @return 锟斤拷锟皆达拷址锟斤拷锟揭拷蠓祷锟斤拷锟揭拷锟斤拷锟斤拷锟斤拷锟?锟斤拷锟津返伙拷 "null"锟截硷拷锟斤拷 锟斤拷 : MatchResult matchResult =
	 *         getHardRegexpMatchResult("http://www.suncer.com:8080/index.html?login=true",Regexp.url_regexp)
	 *         锟矫碉拷取锟斤拷锟斤拷匹锟斤拷值为 matchResult.group(0)=
	 *         http://www.suncer.com:8080/index.html?login=true
	 *         matchResult.group(1) = http matchResult.group(2) = www.suncer.com
	 *         matchResult.group(3) = :8080 matchResult.group(4) =
	 *         /index.html?login=true
	 */
	public static MatchResult getSoftRegexpMatchResult(String source,
			String regexp) {
		try {
			// 锟斤拷锟节讹拷锟斤拷锟斤拷锟斤拷锟绞斤拷锟斤拷锟侥ｏ拷锟斤拷锟斤拷锟?
			PatternCompiler compiler = new Perl5Compiler();

			// 锟斤拷锟斤拷锟绞斤拷冉锟斤拷锟斤拷锟斤拷锟斤拷
			PatternMatcher matcher = new Perl5Matcher();

			// 实锟斤拷锟斤拷执锟叫⌒达拷锟斤拷锟斤拷锟斤拷式模锟斤拷
			Pattern softPattern = compiler.compile(regexp,
					Perl5Compiler.CASE_INSENSITIVE_MASK);

			// 锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟饺?锟斤拷锟斤拷取锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷
			if (matcher.contains(source, softPattern)) {
				// MatchResult result=matcher.getMatch();
				return matcher.getMatch();
			}

		} catch (MalformedPatternException e) {
			e.printStackTrace();

		}
		return null;
	}

	/**
	 * 锟斤拷锟斤拷锟斤拷要锟斤拷锟斤拷锟斤拷锟斤拷(锟斤拷小写锟斤拷锟叫碉拷锟斤拷锟斤拷锟绞斤拷锟斤拷锟?
	 * 
	 * @param source
	 *            锟斤拷锟斤拷锟皆达拷址锟?
	 * 
	 * @param regexp
	 *            锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷式
	 * 
	 * @return 锟斤拷锟皆达拷址锟斤拷锟揭拷蠓祷锟斤拷锟揭拷锟斤拷锟斤拷锟斤拷锟?{@link #getHardRegexpMatchResult(String, String) 使锟矫凤拷锟斤拷锟轿硷拷getHardRegexpMatchResult(String, String)}
	 */
	public static ArrayList getHardRegexpArray(String source, String regexp) {
		List tempList = new ArrayList();

		try {
			// 锟斤拷锟节讹拷锟斤拷锟斤拷锟斤拷锟绞斤拷锟斤拷锟侥ｏ拷锟斤拷锟斤拷锟?
			PatternCompiler compiler = new Perl5Compiler();

			// 实锟斤拷锟叫★拷锟叫⌒达拷锟斤拷械锟斤拷锟斤拷锟斤拷式模锟斤拷
			Pattern hardPattern = compiler.compile(regexp);

			// 锟斤拷锟斤拷锟绞斤拷冉锟斤拷锟斤拷锟斤拷锟斤拷
			PatternMatcher matcher = new Perl5Matcher();

			// 锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟饺?锟斤拷锟斤拷取锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷
			if (matcher.contains(source, hardPattern)) {
				// 锟斤拷锟饺★拷锟街碉拷锟斤拷锟斤拷锟斤拷式锟饺斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟?
				MatchResult matchResult = matcher.getMatch();
				for (int i = 0; i < matchResult.length()
						&& matchResult.group(i) != null; i++) {
					tempList.add(i, matchResult.group(i));
				}
			}
		} catch (MalformedPatternException e) {
			e.printStackTrace();
		}
		return (ArrayList) tempList;
	}

	/**
	 * 锟斤拷锟斤拷锟斤拷要锟斤拷锟斤拷锟斤拷锟斤拷(锟斤拷锟斤拷执锟叫⌒达拷锟斤拷锟斤拷锟斤拷式锟斤拷锟斤拷)
	 * 
	 * @param source
	 *            锟斤拷锟斤拷锟皆达拷址锟?
	 * 
	 * @param regexp
	 *            锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷式
	 * 
	 * @return 锟斤拷锟皆达拷址锟斤拷锟揭拷蠓祷锟斤拷锟揭拷锟斤拷锟斤拷锟斤拷锟絳@link #getHardRegexpMatchResult(String, String) 使锟矫凤拷锟斤拷锟轿硷拷getHardRegexpMatchResult(String, String)}
	 */
	public static ArrayList getSoftRegexpArray(String source, String regexp) {
		List tempList = new ArrayList();

		try {
			// 锟斤拷锟节讹拷锟斤拷锟斤拷锟斤拷锟绞斤拷锟斤拷锟侥ｏ拷锟斤拷锟斤拷锟?
			PatternCompiler compiler = new Perl5Compiler();
			// 锟斤拷锟斤拷锟绞斤拷冉锟斤拷锟斤拷锟斤拷锟斤拷
			PatternMatcher matcher = new Perl5Matcher();
			// 实锟斤拷锟斤拷执锟叫⌒达拷锟斤拷锟斤拷锟斤拷式模锟斤拷
			Pattern softPattern = compiler.compile(regexp,
					Perl5Compiler.CASE_INSENSITIVE_MASK);

			if (matcher.contains(source, softPattern)) {
				// 锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟饺?锟斤拷锟斤拷取锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷
				MatchResult matchResult = matcher.getMatch();
				for (int i = 0; i < matchResult.length()
						&& matchResult.group(i) != null; i++) {
					tempList.add(i, matchResult.group(i));
				}
			}
		} catch (MalformedPatternException e) {
			e.printStackTrace();
		}
		return (ArrayList) tempList;
	}

	/**
	 * <pre>
	 * 锟矫碉拷指锟斤拷锟街革拷锟斤拷锟叫硷拷锟斤拷址锟侥硷拷锟斤拷,
	 *              说锟斤拷: 1.锟街革拷锟斤拷为 ()锟斤拷[]锟斤拷{}锟斤拷&lt;&gt; 锟叫碉拷一锟斤拷
	 *                        2.锟矫碉拷锟侥硷拷锟斤拷锟斤拷 ASCII 锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷
	 *              锟斤拷       String originStr=&quot;((([a]+[b])/[c])-24)+[d]&quot;;
	 *              锟斤拷          getStrBetweenSeparator(originStr,&quot;[&quot;,&quot;]&quot;));
	 *                           锟斤拷锟截斤拷锟斤拷锟斤拷锟侥革拷元锟斤拷  [a, b, c, d],
	 *                          锟斤拷 ASCII 锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷
	 * </pre>
	 * 
	 * @param originStr
	 *            要锟斤拷取锟斤拷源锟街凤拷
	 * @param leftSeparator
	 *            锟斤拷叩姆指锟斤拷锟?
	 * @param rightSeparator
	 *            锟揭边的分革拷锟斤拷
	 * @return 指锟斤拷锟街革拷锟斤拷锟叫硷拷锟斤拷址锟侥硷拷锟斤拷
	 */
	public static Set getBetweenSeparatorStr(final String originStr,
			final char leftSeparator, final char rightSeparator) {
		Set variableSet = new TreeSet();
		if (StringHelper.isEmpty(originStr)) {
			return variableSet;
		}
		String sTempArray[] = originStr.split("(\\" + leftSeparator + ")");
		for (int i = 1; i < sTempArray.length; i++) {
			int endPosition = sTempArray[i].indexOf(rightSeparator);
			String sTempVariable = sTempArray[i].substring(0, endPosition);
			variableSet.add(sTempVariable);
		}
		return variableSet;
	}

	@SuppressWarnings("unused")
	public static void main(String a[]) {

		PatternCompiler compiler = new Perl5Compiler();
		PatternMatcher matcher = new Perl5Matcher();
		MatchResult matchResult = matcher.getMatch();

		String email = "wuzhi2000@hotmail.com.cn";
		String email_regexp = "^[\\w-]+(\\.[\\w-]+)*@[\\w-]+(\\.[\\w-]+)+$";
		String url = "http://www";
		String url_regexp = "^(?:http|https|ftp)://(\\w+(-\\w+)*)(\\.(\\w+(-\\w+)*))*(\\?\\S*)?$";// 匹锟斤拷url
		String date = "1111-1-9";
		String date_regexp = "^[1-9]{1}[0-9]{0,3}[-\\s][0-9]{1,2}[-\\s][0-9]{1,2}$";// 匹锟斤拷锟斤拷锟斤拷
		String phone = "010-1234567";
		String phone_regexp = "^(?:0[0-9]{2,4}[-\\s]{1}|\\(0[0-9]{2,4}\\))[0-9]{6,8}$|^[0-9]{6,8}$";// 匹锟斤拷缁?
		String icon = "/he//fff/aaaq34.gif";
		String icon_regexp = "^(/{0,1}\\w){1,}\\.(gif|dmp|png)$|^\\w{1,}\\.(gif|dmp|png)$";
		String name = "\"^";
		String number = "023";
		String pic = "forum/head_icons/anoymous20050428125334.jpg";
		//System.out
			//	.println(Regexp.isSoftRegexpValidate(pic, Regexp.icon_regexp));

		/***********************************************************************
		 * 
		 **********************************************************************/

		try {

			PatternCompiler compiler1 = new Perl5Compiler();
			PatternMatcher matcher1 = new Perl5Matcher();
			MatchResult matchResult1 = matcher1.getMatch();

			// 一锟斤拷锟斤拷取html锟斤拷签锟斤拷锟皆碉拷锟斤拷锟斤拷
			String regexpForFontTag = "<\\s*font\\s+([^>]*)\\s*>";
			String regexpForFontAttrib = "([a-z]+)\\s*=\\s*\"([^\"]+)\"";

			String html = " <font face=\"Arial, serif\" size=\"+2\" color=\"red\">";
			//System.out.println(regexpForFontTag);
			//System.out.println(regexpForFontAttrib);
			//System.out.println(html);

			Pattern p1 = compiler1.compile(regexpForFontTag,
					Perl5Compiler.CASE_INSENSITIVE_MASK);
			Pattern p2 = compiler1.compile(regexpForFontAttrib,
					Perl5Compiler.CASE_INSENSITIVE_MASK);
			//System.out.println(matcher1.contains(html, p1));
			if (matcher1.contains(html, p1)) {
				MatchResult result = matcher1.getMatch();
				//System.out.println(result.group(1));
				String attribs = result.group(1);

				PatternMatcherInput input = new PatternMatcherInput(attribs);
				//System.out.println(matcher1.contains(input, p2));
				while (matcher1.contains(input, p2)) {
					result = matcher1.getMatch();
					//System.out.println(result.group(1) + " : "
					//		+ result.group(2));
				}
			}

		} catch (MalformedPatternException e) {
			e.printStackTrace();
		}

		/***********************************************************************
		 * 一锟斤拷锟斤拷取http锟斤拷锟斤拷锟斤拷 String
		 **********************************************************************/
		try {
			PatternCompiler compiler2 = new Perl5Compiler();
			PatternMatcher matcher2 = new Perl5Matcher();
			MatchResult matchResult2 = matcher2.getMatch();
			String http = "http://www.suncer.com:8080/index.html?login=true";
			String http_regexp = "(\\w+)://([^/:]+)(:\\d*)?([^#\\s]*)";
			Pattern p1 = compiler2.compile(http_regexp,
					Perl5Compiler.CASE_INSENSITIVE_MASK);
			//System.out.println(matcher2.contains(http, p1));
			if (matcher2.contains(http, p1)) {
				MatchResult result = matcher2.getMatch();
				//System.out.println(result.group(1));
				String attribs = result.group(1);

				for (int i = 0; i < result.length() && result.group(i) != null; i++) {
					//System.out.println(i + " : " + result.group(i));
				}
			}
		} catch (MalformedPatternException e) {
			e.printStackTrace();
		}

		// 一锟斤拷锟斤拷取锟街凤拷锟叫碉拷锟斤拷锟斤拷锟斤拷 [ ] 锟斤拷锟斤拷址锟斤拷锟斤拷锟斤拷

		String expression = "((([a]+[b])/[c])-24)+[d]";
		//System.out.println(getBetweenSeparatorStr(expression, '[', ']'));

	}

}
import { DotFilledIcon } from "../../assets/DotFilledIcon";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Dispatch, ReactNode, SetStateAction } from "react";
import clsx from "clsx";
import { Enum } from "./toolbarDropdownTypes";

export const ToolbarRadioDropdown = ({
  children,
  enumType,
  enumCurrent,
  setter,
}: {
  children: ReactNode;
  enumType: Enum;
  enumCurrent: keyof Enum;
  // we lose a bit of safety here but it's impossible to say that it's a dispatch of exactly
  // type enumType
  setter: Dispatch<SetStateAction<any>>;
}) => {
  return (
    <DropdownMenu.Root defaultOpen={false}>
      <DropdownMenu.Trigger asChild>{children}</DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className="w-24 mt-px">
          <DropdownMenu.RadioGroup
            value={enumCurrent}
            onValueChange={(s) => {
              setter(enumType[s as keyof typeof enumType]);
            }}
          >
            {Object.values(enumType).map((val) => (
              <DropdownMenu.RadioItem
                key={val}
                aria-label={val}
                value={val}
                className={clsx(
                  "flex items-center justify-end gap-px w-full cursor-pointer",
                  "bg-slate-100 p-1 shadow-md shadow-slate-500"
                )}
              >
                <DropdownMenu.ItemIndicator className={enumCurrent !== val ? "hidden" : ""}>
                  <DotFilledIcon />
                </DropdownMenu.ItemIndicator>
                {val}
              </DropdownMenu.RadioItem>
            ))}
          </DropdownMenu.RadioGroup>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
